import { DepthLayer, ObstacleAnimationKey } from '../constant/Animations'
import { ImageObj } from '../constant/Images'

export class ZapperPool extends Phaser.Physics.Arcade.StaticGroup {
    private maxScaleFactor = 2
    private moveSpeed = 2

    public spawnLocation = [
        { x: 2000, y: 100 },
        { x: 2000, y: 250 },
        { x: 2000, y: 450 },
        { x: 2500, y: 100 },
        { x: 2500, y: 250 },
        { x: 2500, y: 450 },
        { x: 3000, y: 100 },
        { x: 3000, y: 250 },
        { x: 3000, y: 450 },
    ]

    constructor(scene: Phaser.Scene) {
        super(scene.physics.world, scene, { classType: Zapper, maxSize: 50 })
    }

    public spawn(): void {
        const posIndex = Phaser.Math.Between(0, 8)

        const x = this.spawnLocation[posIndex].x
        const y = this.spawnLocation[posIndex].y

        const zapper = this.get(x, y)
        const scale = Phaser.Math.FloatBetween(1.25, this.maxScaleFactor)

        zapper.setActive(true).setVisible(true).setDepth(DepthLayer.Obstacle).setScale(scale)

        if (zapper.body !== null) {
            zapper.body.enable = true
            zapper.body.x = x
            zapper.body.y = y
            zapper.setSize(zapper.width * scale, zapper.height * scale)
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
            this.scene.anims.create({
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
