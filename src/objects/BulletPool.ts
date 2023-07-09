import { ImageObj } from '../constant/Images'
import { DepthLayer } from '../constant/Animations'

export class BulletPool extends Phaser.Physics.Arcade.Group {
    constructor(scene: Phaser.Scene) {
        super(scene.physics.world, scene, { classType: Bullet, maxSize: 10000 })
    }
    public spawn(x: number, y: number): void {
        const bullet = this.get(x, y)

        bullet
            .setActive(true)
            .setVisible(true)
            .setDepth(DepthLayer.Player)
            .setScale(2)
            .setVelocityY(500)

        if (bullet.body !== null) {
            bullet.body.enable = true
            bullet.body.x = x
            bullet.body.y = y
            bullet.setSize(bullet.width, bullet.height)
        }
    }

    public despawn(bullet: Phaser.Physics.Arcade.Sprite): void {
        bullet.play('explode', true)

        if (bullet.body !== null) {
            bullet.body.enable = false
        }
        this.killAndHide(bullet)
    }
}

export class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, ImageObj.Zapper1.Key)

        this.setOrigin(0)
        this.setScrollFactor(0)

        if (!this.scene.anims.exists('bullet')) {
            this.scene.anims.create({
                key: 'bullet',
                frames: [{ key: ImageObj.Bullet.Key }],
                frameRate: 10,
                repeat: 0,
            })
        }

        if (!this.scene.anims.exists('explode')) {
            this.scene.anims.create({
                key: 'explode',
                frames: [{ key: ImageObj.BulletCollision.Key }],
                frameRate: 10,
                repeat: 0,
            })
        }

        this.play('bullet', true)
    }
}
