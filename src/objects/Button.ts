export class Button extends Phaser.GameObjects.Container {
    private background: Phaser.GameObjects.Rectangle
    private text: Phaser.GameObjects.Text
    private callback: () => void
    private isPointerDown: boolean

    constructor(scene: Phaser.Scene, x: number, y: number, text: string, callback: () => void) {
        super(scene, x, y)
        this.callback = callback
        this.isPointerDown = false

        // Create the background rectangle
        this.background = new Phaser.GameObjects.Rectangle(scene, 0, 0, 200, 80, 0xf7f7f7, 0.8)
        this.background.setOrigin(0)

        // Create the text label
        this.text = new Phaser.GameObjects.Text(scene, 100, 40, text, {
            fontSize: '32px',
            color: '#000000',
        })
        this.text.setOrigin(0)

        // Add the background and text to the container
        this.add(this.background)
        this.add(this.text)
        this.setSize(this.background.width, this.background.height)

        // Register pointer events
        this.setInteractive({ useHandCursor: true })
        this.on('pointerdown', this.onButtonDown, this)
        this.on('pointerup', this.onButtonUp, this)
        this.on('pointerout', this.onButtonOut, this)

        // Add the button to the scene
        scene.add.existing(this)
    }

    private onButtonDown() {
        this.isPointerDown = true
        this.background.setFillStyle(0x000000, 0.6)
    }

    private onButtonUp() {
        if (this.isPointerDown) {
            this.isPointerDown = false
            this.background.setFillStyle(0x000000, 0.8)
            this.callback()
        }
    }

    private onButtonOut() {
        this.isPointerDown = false
        this.background.setFillStyle(0x000000, 0.8)
    }
}
