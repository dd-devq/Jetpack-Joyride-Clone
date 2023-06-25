export class ZapperPool extends Phaser.Physics.Arcade.StaticGroup {
    constructor(scene: Phaser.Scene) {
        super(scene.physics.world, scene, { classType: Zapper, maxSize: 5 })
    }
    public spawn(): void {
        const x = Phaser.Math.Between(1500, 1700)
        const y = Phaser.Math.Between(300, 400)

        // Find first inactive sprite in group or add new sprite, and set position
        const zapper = this.get(x, y, 'Zapper')

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
        if (zapper.body !== null) {
            zapper.body.enable = false
        }
    }
}

export class Zapper extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, texture = 'Zapper') {
        super(scene, x, y, texture)

        // Set up the zapper properties
        this.setOrigin(0, 0)
        this.setScrollFactor(0)
        this.setDepth(1)

        // Create the zapper animation
        scene.anims.create({
            key: 'zapperAnimation',
            frames: [
                { key: `${texture}1` },
                { key: `${texture}2` },
                { key: `${texture}3` },
                { key: `${texture}4` },
            ],
            frameRate: 10,
            repeat: -1,
        })

        this.anims.play('zapperAnimation')
    }
}
