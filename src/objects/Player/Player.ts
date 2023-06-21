export class Player extends Phaser.Physics.Arcade.Sprite {
    private jumpForce: number
    private inputPointer: Phaser.Input.Pointer

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'PlayerFly')

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.jumpForce = 300

        // Set up collision and physics properties
        this.setCollideWorldBounds(true)
        this.setBounce(0.2)

        // Enable input for tap or click
        this.inputPointer = scene.input.activePointer
    }

    update() {
        console.log(this.inputPointer.isDown)
        if (this.inputPointer.isDown) {
            this.jump()
        }
    }

    private jump(): void {
        this.setVelocityY(-this.jumpForce)
    }
}
