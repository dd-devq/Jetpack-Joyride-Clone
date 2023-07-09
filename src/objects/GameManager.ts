import { ImageObj } from '../constant/Images'
import { Player } from './Player/Player'
import { CoinPool } from './CoinPool'
import { ZapperPool } from './ZapperPool'
import { Gameplay } from '../scenes/Gameplay'
import { DepthLayer } from '../constant/Animations'
import { SoundManager } from './SoundManager'
import { AudioObj } from '../constant/Audio'

export class GameManager {
    public scene: Phaser.Scene

    public coinCount = 0
    public backgroundSprite: Phaser.GameObjects.TileSprite

    public coinPool: CoinPool
    public zapperPool: ZapperPool

    public player: Player
    private isGameOver = false

    private levelMap1: Phaser.Tilemaps.Tilemap
    private platform1: Phaser.Tilemaps.TilemapLayer | undefined

    private levelMap2: Phaser.Tilemaps.Tilemap
    private platform2: Phaser.Tilemaps.TilemapLayer | undefined

    private levelMap3: Phaser.Tilemaps.Tilemap
    private platform3: Phaser.Tilemaps.TilemapLayer | undefined

    constructor(scene: Phaser.Scene) {
        this.scene = scene

        this.initBackground()
        this.initCoinPool()
        this.initZapperPool()
        this.initPlayer()
        this.scaleGameObejcts()
        this.initPhysic()
    }

    private initPhysic(): void {
        if (this.platform1 !== undefined) {
            this.scene.physics.add.collider(this.platform1, this.player)
            this.scene.physics.add.collider(
                this.platform1,
                this.player.bulletPool,
                this.bulletCollide,
                undefined,
                this
            )
        }

        this.scene.physics.add.overlap(
            this.player,
            this.coinPool,
            this.collectCoin,
            undefined,
            this
        )
        this.scene.physics.add.overlap(this.player, this.zapperPool, this.gameOver, undefined, this)

        this.scene.physics.add.overlap(
            this.coinPool,
            this.zapperPool,
            this.respawnZapper,
            undefined,
            this
        )
    }
    private bulletCollide(
        bullet: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody,
        tile: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody
    ): void {
        const bulletObj = bullet as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
        this.coinPool.despawn(bulletObj)
        bulletObj.destroy()
    }

    private respawnZapper(
        coin: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody,
        zapper: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody
    ): void {
        const zapperObj = zapper as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
        for (const pos of this.zapperPool.spawnLocation) {
            if (pos.x != zapperObj.x && pos.y != zapperObj.y) {
                zapperObj.setPosition(pos.x, pos.y)
                zapperObj.body.x = pos.x
                zapperObj.body.y = pos.y
                break
            }
        }
    }

    private gameOver(): void {
        if (!this.isGameOver) {
            SoundManager.getInstance().playAudio(this.scene, AudioObj.Die.Key, false)
            this.player.gotoState('Dead')
            ;(<Gameplay> this.scene).gotoState('GameOver')
            this.isGameOver = true
        }
    }

    private collectCoin(
        player: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody,
        coin: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody
    ): void {
        SoundManager.getInstance().playAudio(this.scene, AudioObj.Coin.Key, false)
        const coinObj = coin as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
        this.coinPool.killAndHide(coinObj)
        coinObj.destroy()
        this.coinCount += 1
        ;(<Gameplay> this.scene).textCoin.setText('Coins: ' + this.coinCount)
    }

    public update() {
        if (!this.isGameOver && this.platform1 !== undefined) {
            this.backgroundSprite.tilePositionX += 0.75
            this.platform1.x -= 1
            this.coinPool.update()
            this.zapperPool.update()
            this.player.update()
        }
    }

    private initCoinPool(): void {
        this.coinPool = new CoinPool(this.scene)
        this.coinPool.spawnBunch()
        this.scene.time.addEvent({
            delay: 6000,
            loop: true,
            callback: () => this.coinPool.spawnBunch(),
        })
    }

    public initZapperPool(): void {
        this.zapperPool = new ZapperPool(this.scene)
        this.scene.time.addEvent({
            delay: 3000,
            loop: true,
            callback: () => this.zapperPool.spawn(),
        })
    }

    // Background
    private initBackground() {
        // Dynamic Background
        const { width, height } = this.scene.scale
        this.backgroundSprite = this.scene.add
            .tileSprite(0, 0, width, height, ImageObj.BASE_BACKGROUND_GREEN.key)
            .setOrigin(0)
            .setDepth(DepthLayer.Background)

        this.levelMap1 = this.scene.make.tilemap({ key: 'level-1', tileWidth: 16, tileHeight: 16 })
        const tileSet1 = this.levelMap1.addTilesetImage('Terrain', ImageObj.terrain.key)
        if (tileSet1 !== null) {
            this.platform1 = this.levelMap1
                .createLayer('Ground', tileSet1, 0, 0)
                ?.setOrigin(0)
                .setDepth(DepthLayer.Background)

            if (this.platform1 !== undefined) {
                this.platform1.setScale(height / this.platform1.height)
                this.platform1.setCollision([6, 7, 8, 9, 10, 28, 29, 31, 32, 50, 52])
            }
        }
    }

    // Player
    private initPlayer() {
        this.player = new Player(this.scene, 0, 100).setDepth(DepthLayer.Player)
    }

    private scaleGameObejcts(): void {
        const backgroundTexture = this.scene.textures.get(ImageObj.Background.Key)
        const backgroundFrame = backgroundTexture.get(0)
        const scaleX = this.scene.cameras.main.width / backgroundFrame.width
        const scaleY = this.scene.cameras.main.height / backgroundFrame.height

        this.backgroundSprite.setTileScale(scaleX, scaleY)
    }
}
