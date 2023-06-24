import { ImageObj } from '../constant/Images'
import { Player } from './Player/Player'

export class GameManager {
    public scene: Phaser.Scene

    public coinCount = 0
    public platforms: Phaser.Physics.Arcade.StaticGroup
    public backgroundSprite: Phaser.GameObjects.TileSprite

    public coinPool: CoinPool
    public zapperPool: ZapperPool

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
        const coinObj = coin as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
        this.coinPool.killAndHide(coinObj)
        coinObj.destroy()
        this.coinCount += 1
    }

    public update() {
        this.backgroundSprite.tilePositionX += 0.75
        this.updateCoin()
        this.player.update()
    }

    private updateCoin() {
        this.coinPool.getChildren().forEach((value: Phaser.GameObjects.GameObject) => {
            const coin = value as Phaser.Physics.Arcade.Sprite
            coin.x -= 1.65
            if (coin.body !== null) {
                coin.body.x -= 1.65
            }

            if (coin.x < 0) {
                this.coinPool.despawn(coin)
            }
        })
    }

    private initCoinPool(): void {
        this.coinPool = new CoinPool(this.scene)

        this.scene.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => this.coinPool.spawn(),
        })
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
            const coin = <Phaser.Physics.Arcade.Sprite>object
            coin.setScale(scaleX, scaleY)
            coin.body?.setSize(coin.x, coin.y)
        })
    }
}

class CoinPool extends Phaser.Physics.Arcade.StaticGroup {
    constructor(scene: Phaser.Scene) {
        super(scene.physics.world, scene, { key: ImageObj.Coin.Key, maxSize: 100 })
    }
    public spawn(): void {
        const x = Phaser.Math.Between(1500, 1700)
        const y = Phaser.Math.Between(100, 400)

        // Find first inactive sprite in group or add new sprite, and set position
        const coin = this.get(x, y).setOrigin(0)

        // None free or already at maximum amount of sprites in group
        if (!coin) {
            return
        }

        coin.setActive(true).setVisible(true).setDepth(7)
        if (coin.body !== null) {
            coin.body.enable = true
            coin.body.x = x
            coin.body.y = y
        }
    }

    public despawn(coin: Phaser.Physics.Arcade.Sprite): void {
        this.killAndHide(coin)
        coin.destroy()
    }
}

class ZapperPool extends Phaser.Physics.Arcade.StaticGroup {
    constructor(scene: Phaser.Scene) {
        super(scene.physics.world, scene, { key: ImageObj.Zapper1.Key, maxSize: 100 })
    }
    public spawn(): void {
        const x = Phaser.Math.Between(1500, 1700)
        const y = Phaser.Math.Between(300, 400)

        // Find first inactive sprite in group or add new sprite, and set position
        const zapper = this.get(x, y).setOrigin(0)

        // None free or already at maximum amount of sprites in group
        if (!zapper) {
            return
        }

        zapper.setActive(true).setVisible(true).setDepth(7)
        if (zapper.body !== null) {
            zapper.body.enable = true
            zapper.body.x = x
            zapper.body.y = y
        }
    }

    public despawn(zapper: Phaser.Physics.Arcade.Sprite): void {
        this.killAndHide(zapper)
        zapper.destroy()
    }
}
