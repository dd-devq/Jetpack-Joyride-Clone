import { ImageObj } from '../constant/Images'
import { Player } from './Player/Player'

export class GameManager {
    public scene: Phaser.Scene

    public coinCount = 0
    public platforms: Phaser.Physics.Arcade.StaticGroup
    public backgroundSprite: Phaser.GameObjects.TileSprite
    public coinPool: Phaser.Physics.Arcade.StaticGroup
    public player: Player

    constructor(scene: Phaser.Scene) {
        this.scene = scene
        this.initBackground()
        this.initCoinPool()
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
    }

    private collectCoin(
        player: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody,
        coin: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody
    ): void {
        const starWithBody = coin as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
        starWithBody.disableBody(true, true)
        this.coinCount += 1
    }

    public update() {
        this.backgroundSprite.tilePositionX += 0.75
        this.player.update()
    }

    private initCoinPool(): void {
        this.coinPool = this.scene.physics.add
            .staticGroup({
                key: ImageObj.Coin.Key,
                repeat: 10,
                setXY: { x: 12, y: 300, stepX: 70 },
            })
            .setDepth(7)
    }

    // Background
    private initBackground() {
        // Dynamic Background
        const { width, height } = this.scene.scale
        this.backgroundSprite = this.scene.add
            .tileSprite(0, 0, width, height, ImageObj.Background.Key)
            .setOrigin(0)
            .setDepth(5)

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
        this.player = new Player(this.scene, 100, 300).setDepth(10)
        this.player.platforms = this.platforms
    }

    private scaleGameObejcts(): void {
        const backgroundTexture = this.scene.textures.get(ImageObj.Background.Key)
        const backgroundFrame = backgroundTexture.get(0)
        const scaleX = window.innerWidth / backgroundFrame.width
        const scaleY = window.innerHeight / backgroundFrame.height

        this.backgroundSprite.setTileScale(scaleX, scaleY)
        this.coinPool.getChildren().forEach((object: Phaser.GameObjects.GameObject) => {
            const coin = <Phaser.GameObjects.Sprite>object
            coin.setScale(scaleX, scaleY)
        })

        // this.platforms.getChildren().forEach((object: Phaser.GameObjects.GameObject) => {
        //     const platform = <Phaser.Physics.Arcade.Sprite>object
        //     platform.body?.setSize(platform.width, platform.height)
        // })
    }
}
