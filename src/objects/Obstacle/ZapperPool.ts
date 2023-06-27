import { DepthLayer, ObstacleAnimationKey } from '../../constant/Animations'
import { ImageObj } from '../../constant/Images'

export class ZapperPool extends Phaser.Physics.Arcade.StaticGroup {
    private moveSpeed = 1.65
    constructor(scene: Phaser.Scene) {
        super(scene.physics.world, scene, { classType: Zapper, maxSize: 5 })
    }

    public spawn(): void {
        const x = Phaser.Math.Between(1500, 1700)
        const y = Phaser.Math.Between(300, 400)

        const zapper = this.get(x, y)

        zapper.setActive(true).setVisible(true).setDepth(DepthLayer.Obstacle)

        if (zapper.body !== null) {
            zapper.body.enable = true
            zapper.body.x = x
            zapper.body.y = y
            zapper.setSize(zapper.width, zapper.height)
        }
    }

    public despawn(zapper: Phaser.Physics.Arcade.Sprite): void {
        if (zapper.body !== null) {
            zapper.body.enable = false
        }
        this.killAndHide(zapper)
    }

    update() {
        this.getChildren().forEach((value: Phaser.GameObjects.GameObject) => {
            const zapper = value as Zapper

            zapper.x -= this.moveSpeed
            if (zapper.body !== null) {
                zapper.body.x -= this.moveSpeed
            }

            if (zapper.x < 0) {
                this.despawn(zapper)
            }
        })
    }
}

export class Zapper extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, ImageObj.Zapper1.Key)

        this.setOrigin(0)
        this.setScrollFactor(0)

        if (!this.scene.anims.exists(ObstacleAnimationKey.Zapper)) {
            scene.anims.create({
                key: ObstacleAnimationKey.Zapper,
                frames: [
                    { key: ImageObj.Zapper1.Key },
                    { key: ImageObj.Zapper2.Key },
                    { key: ImageObj.Zapper3.Key },
                    { key: ImageObj.Zapper4.Key },
                ],
                frameRate: 10,
                repeat: -1,
            })
        }

        this.anims.play(ObstacleAnimationKey.Zapper)
    }
}
