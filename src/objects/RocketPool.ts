import { DepthLayer } from '../constant/Animations'
import { ImageObj } from '../constant/Images'

export class RocketPool extends Phaser.Physics.Arcade.StaticGroup {
    private maxScaleFactor = 2
    private moveSpeed = 1.65

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
        super(scene.physics.world, scene, { classType: Rocket, maxSize: 50 })
    }

    public spawn(): void {
        const posIndex = Phaser.Math.Between(0, 8)

        const x = this.spawnLocation[posIndex].x
        const y = this.spawnLocation[posIndex].y

        const rocket = this.get(x, y)
        const scale = Phaser.Math.FloatBetween(1.25, this.maxScaleFactor)

        rocket.setActive(true).setVisible(true).setDepth(DepthLayer.Obstacle).setScale(scale)

        if (rocket.body !== null) {
            rocket.body.enable = true
            rocket.body.x = x
            rocket.body.y = y
            rocket.setSize(rocket.width * scale, rocket.height * scale)
        }
    }

    public despawn(rocket: Phaser.Physics.Arcade.Sprite): void {
        if (rocket.body !== null) {
            rocket.body.enable = false
        }
        this.killAndHide(rocket)
    }

    update() {
        this.getChildren().forEach((value: Phaser.GameObjects.GameObject) => {
            const rocket = value as Rocket

            rocket.x -= this.moveSpeed
            if (rocket.body !== null) {
                rocket.body.x -= this.moveSpeed
            }

            if (rocket.x < 0) {
                this.despawn(rocket)
            }
        })
    }
}

export class Rocket extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, ImageObj.Rocket.Key)

        this.setOrigin(0)
        this.setScrollFactor(0)
        this.scene.add.existing(this)
    }
}
