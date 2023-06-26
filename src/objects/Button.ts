export class Button extends Phaser.GameObjects.Container {
    private background: Phaser.GameObjects.Rectangle
    private text: Phaser.GameObjects.Text
    private callback: () => void

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        width: number,
        height: number,
        text: string
    ) {
        super(scene, x, y)

        // Create the background rectangle
        this.background = new Phaser.GameObjects.Rectangle(
            scene,
            0,
            0,
            width,
            height,
            0x000000,
            0.8
        )
        this.background.setOrigin(0)

        // Create the text label
        this.text = new Phaser.GameObjects.Text(scene, width / 2, height / 2, text, {
            fontSize: '24px',
            color: '#ffffff',
        })
        this.text.setOrigin(0.5)

        // Add the background and text to the container
        this.add(this.background)
        this.add(this.text)

        // Enable button interactivity
        this.setInteractive({ useHandCursor: true })
            .on('pointerdown', this.onButtonDown, this)
            .on('pointerup', this.onButtonUp, this)
            .on('pointerout', this.onButtonOut, this)

        scene.add.existing(this)
    }

    private onButtonDown() {
        this.background.setFillStyle(0x000000, 0.6)
    }

    private onButtonUp() {
        this.background.setFillStyle(0x000000, 0.8)
    }

    private onButtonOut() {
        this.background.setFillStyle(0x000000, 0.8)
    }
}
