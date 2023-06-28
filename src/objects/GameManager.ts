import { ImageObj } from '../constant/Images'
import { Player } from './Player/Player'
import { CoinPool } from './Collectible/CoinPool'
import { ZapperPool } from './Obstacle/ZapperPool'
import { Gameplay } from '../scenes/Gameplay'
import { DepthLayer } from '../constant/Animations'

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
    }

    private gameOver(): void {
        if (!this.isGameOver) {
            this.player.gotoState('Dead')
            ;(<Gameplay> this.scene).gotoState('GameOver')
            this.isGameOver = true
        }
    }

    private collectCoin(
        player: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody,
        coin: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody
    ): void {
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
            delay: 2000,
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
        this.player = new Player(this.scene, 100, 300).setDepth(DepthLayer.Player)
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
