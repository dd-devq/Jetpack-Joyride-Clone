import { DepthLayer } from '../../constant/Animations'
import { ImageObj } from '../../constant/Images'

export class CoinPool extends Phaser.Physics.Arcade.StaticGroup {
    public moveSpeed = 1.65
    public maxHeight = 100
    public minHeight = 650

    constructor(scene: Phaser.Scene) {
        super(scene.physics.world, scene, { classType: Coin, maxSize: 50 })
    }

    public spawnBunch(): void {
        const x = Phaser.Math.Between(2000, 2800)
        const y = Phaser.Math.Between(this.maxHeight, this.minHeight)
    }

    public spawn(x: number, y: number): void {
        const coin = this.get(x, y)
        coin.setActive(true).setVisible(true).setDepth(DepthLayer.Collectible).setScale(2)

        if (coin.body !== null) {
            coin.body.enable = true
            coin.body.x = x
            coin.body.y = y
            coin.body.setSize(coin.width * 2, coin.height * 2)
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
