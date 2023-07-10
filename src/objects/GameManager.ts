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

    private platforms: Phaser.Tilemaps.TilemapLayer[] = []
    private platformGroup: Phaser.Physics.Arcade.StaticGroup

    constructor(scene: Phaser.Scene) {
        this.scene = scene

        this.initCoinPool()
        this.initZapperPool()
        this.initPlayer()
        this.initBackground()

        this.scaleGameObejcts()
        this.initPhysic()
    }

    private initPhysic(): void {
        this.scene.physics.add.collider(this.platformGroup, this.player)
        this.scene.physics.add.overlap(
            this.player,
            this.coinPool,
            this.collectCoin,
            undefined,
            this
        )

        this.scene.physics.add.collider(
            this.player.bulletPool,
            this.platformGroup,
            this.bulletCollide,
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
        if (!this.isGameOver) {
            const { width, height } = this.scene.scale
            this.backgroundSprite.tilePositionX += 0.5

            for (const layer of this.platforms) {
                layer.x -= 2.5
                if (layer.x + (layer.width * height) / layer.height < 0) {
                    this.platforms.splice(this.platforms.indexOf(layer), 1)
                    layer.destroy()

                    const index = Phaser.Math.Between(1, 3)
                    if (index == 1) {
                        this.createTileMap1()
                    } else if (index == 2) {
                        this.createTileMap2()
                    } else {
                        this.createTileMap3()
                    }
                }
            }
            this.coinPool.update()
            this.zapperPool.update()
            this.player.update()
        }
    }

    private initCoinPool(): void {
        this.coinPool = new CoinPool(this.scene)
        this.coinPool.spawnBunch()
        this.scene.time.addEvent({
            delay: 10000,
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

    private createTileMap1(): void {
        const { width, height } = this.scene.scale

        const levelMap1 = this.scene.make.tilemap({ key: 'map-1', tileWidth: 16, tileHeight: 16 })
        const tileSet1 = levelMap1.addTilesetImage('Terrain', ImageObj.terrain.key)
        if (tileSet1 !== null) {
            const platform1 = levelMap1
                .createLayer('Ground', tileSet1, 0, 0)
                ?.setOrigin(0)
                .setDepth(DepthLayer.Background)
            if (platform1 !== undefined) {
                platform1.setScale(height / platform1.height)
                if (this.platforms.length != 0) {
                    platform1.x =
                        this.platforms[this.platforms.length - 1].x +
                        (this.platforms[this.platforms.length - 1].width * height) /
                            platform1.height
                }
                this.platforms.push(platform1)
            }
        }
    }
    private createTileMap2(): void {
        const { width, height } = this.scene.scale

        const levelMap2 = this.scene.make.tilemap({ key: 'map-2', tileWidth: 16, tileHeight: 16 })
        const tileSet2 = levelMap2.addTilesetImage('Terrain', ImageObj.terrain.key)
        if (tileSet2 !== null) {
            const platform2 = levelMap2
                .createLayer('Ground', tileSet2, 0, 0)
                ?.setOrigin(0)
                .setDepth(DepthLayer.Background)
            if (platform2 !== undefined) {
                platform2.setScale(height / platform2.height)
                if (this.platforms.length != 0) {
                    platform2.x =
                        this.platforms[this.platforms.length - 1].x +
                        (this.platforms[this.platforms.length - 1].width * height) /
                            platform2.height
                }
                this.platforms.push(platform2)
            }
        }
    }

    private createTileMap3(): void {
        const { width, height } = this.scene.scale

        const levelMap3 = this.scene.make.tilemap({ key: 'map-3', tileWidth: 16, tileHeight: 16 })
        const tileSet3 = levelMap3.addTilesetImage('Terrain', ImageObj.terrain.key)
        if (tileSet3 !== null) {
            const platform3 = levelMap3
                .createLayer('Ground', tileSet3, 0, 0)
                ?.setOrigin(0)
                .setDepth(DepthLayer.Background)
            if (platform3 !== undefined) {
                platform3.setScale(height / platform3.height)
                if (this.platforms.length != 0) {
                    platform3.x =
                        this.platforms[this.platforms.length - 1].x +
                        (this.platforms[this.platforms.length - 1].width * height) /
                            platform3.height
                }
                this.platforms.push(platform3)
            }
        }
    }

    // Background
    private initBackground() {
        // Dynamic Background
        const { width, height } = this.scene.scale
        this.backgroundSprite = this.scene.add
            .tileSprite(0, 0, width, height, ImageObj.BASE_BACKGROUND_GREEN.key)
            .setOrigin(0)
            .setDepth(DepthLayer.Background)

        this.createTileMap1()
        this.createTileMap2()
        this.createTileMap3()

        this.platformGroup = this.scene.physics.add.staticGroup()
        this.platformGroup
            .create(window.innerWidth / 2, window.innerHeight * 0.9, ImageObj.Ground.Key)
            .setScale(5, 1)
            .refreshBody()
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
