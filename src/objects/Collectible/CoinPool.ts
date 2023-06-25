import { ImageObj } from '../../constant/Images'

export class CoinPool extends Phaser.Physics.Arcade.StaticGroup {
    constructor(scene: Phaser.Scene) {
        super(scene.physics.world, scene, { key: ImageObj.Coin.Key, maxSize: 50 })
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
