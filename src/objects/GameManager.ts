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
    public platforms: Phaser.Physics.Arcade.StaticGroup
    public backgroundSprite: Phaser.GameObjects.TileSprite

    public coinPool: CoinPool
    public zapperPool: ZapperPool

    public player: Player
    private isGameOver = false
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
        this.scene.physics.add.collider(this.player, this.platforms)
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

        this.scene.physics.add.collider(
            this.platforms,
            this.player.bulletPool,
            this.bulletCollide,
            undefined,
            this
        )
    }
    private bulletCollide(
        coin: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody,
        bullet: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody
    ): void {
        const bulletObj = bullet as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
        bulletObj.anims.play('explode', true)
        this.coinPool.killAndHide(bulletObj)
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
        if (!this.isGameOver) {
            this.backgroundSprite.tilePositionX += 0.75
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
            .tileSprite(0, 0, width, height, ImageObj.Background.Key)
            .setOrigin(0)
            .setDepth(DepthLayer.Background)

        this.platforms = this.scene.physics.add.staticGroup()
        this.platforms
            .create(window.innerWidth / 2, window.innerHeight * 0.9, ImageObj.Ground.Key)
            .setScale(5, 1)
            .refreshBody()

        this.platforms
            .create(window.innerWidth / 2, window.innerHeight * 0.1, ImageObj.Ground.Key)
            .setScale(5, 1)
            .refreshBody()
    }

    // Player
    private initPlayer() {
        this.player = new Player(this.scene, 0, 400).setDepth(DepthLayer.Player)
        this.player.platforms = this.platforms
    }

    private scaleGameObejcts(): void {
        const backgroundTexture = this.scene.textures.get(ImageObj.Background.Key)
        const backgroundFrame = backgroundTexture.get(0)
        const scaleX = this.scene.cameras.main.width / backgroundFrame.width
        const scaleY = this.scene.cameras.main.height / backgroundFrame.height

        this.backgroundSprite.setTileScale(scaleX, scaleY)
    }
}
