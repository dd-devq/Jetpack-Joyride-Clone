import { DepthLayer } from '../../constant/Animations'
import { ImageObj } from '../../constant/Images'

export class CoinPool extends Phaser.Physics.Arcade.StaticGroup {
    public moveSpeed = 1.65
    public maxHeight = 100
    public minHeight = 300
    public scaleFactor = 2
    public coinOffset = 30

    constructor(scene: Phaser.Scene) {
        super(scene.physics.world, scene, { classType: Coin, maxSize: 250 })
    }

    public spawnBunch(): void {
        const x = Phaser.Math.Between(2000, 2700)
        const y = Phaser.Math.Between(this.maxHeight, this.minHeight)

        const patternIndex = Phaser.Math.Between(1, 27).toString()
        const key = 'CoinPattern' + patternIndex

        const pattern = this.scene.cache.text.get(key)

        let coinOffsetX = 0
        let coinOffsetY = 0
        const lines = pattern.split('\n')

        for (const line of lines) {
            for (const char of line) {
                if (char == '1') {
                    this.spawn(x + coinOffsetX, y + coinOffsetY)
                }
                coinOffsetX += this.coinOffset
            }

            coinOffsetY += this.coinOffset
            coinOffsetX = 0
        }
    }

    public spawn(x: number, y: number): void {
        const coin = this.get(x, y)
        coin.setActive(true)
            .setVisible(true)
            .setDepth(DepthLayer.Collectible)
            .setScale(this.scaleFactor)

        if (coin.body !== null) {
            coin.body.enable = true
            coin.body.x = x
            coin.body.y = y
            coin.body.setSize(coin.width * this.scaleFactor, coin.height * this.scaleFactor)
        }
    }

    public despawn(coin: Phaser.Physics.Arcade.Sprite): void {
        if (coin.body !== null) {
            coin.body.enable = false
        }
        this.killAndHide(coin)
    }

    update() {
        this.getChildren().forEach((object: Phaser.GameObjects.GameObject) => {
            const coin = object as Phaser.Physics.Arcade.Sprite

            coin.x -= this.moveSpeed
            if (coin.body !== null) {
                coin.body.x -= this.moveSpeed
            }

            if (coin.x < 0) {
                this.despawn(coin)
            }
        })
    }
}

export class Coin extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, ImageObj.Coin.Key)
        this.setOrigin(0, 0)
        this.setScrollFactor(0)
    }
}
