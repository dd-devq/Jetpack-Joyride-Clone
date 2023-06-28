import { DepthLayer } from '../constant/Animations'

export class Button extends Phaser.GameObjects.Container {
    private background: Phaser.GameObjects.Rectangle

    private text: Phaser.GameObjects.Text
    public sprite: Phaser.GameObjects.NineSlice

    private isPointerDown: boolean
    private isPointerOver: boolean

    private callback: () => void

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        width: number,
        height: number,
        content: string,
        isText: boolean,
        callback: () => void
    ) {
        super(scene, x, y)
        this.callback = callback
        this.isPointerDown = false
        this.isPointerOver = false

        if (isText) {
            this.text = this.scene.add.text(x, y, content).setOrigin(0.5).setDepth(DepthLayer.UI)
        } else {
            this.sprite = this.scene.add
                .nineslice(x, y, content, undefined, width, height, 10, 10)
                .setDisplaySize(width, height)
                .setDepth(DepthLayer.UI)
        }

        // Create the background rectangle
        this.background = this.scene.add
            .rectangle(x, y, width, height, 0x000000, 0)
            .setDisplaySize(width, height)
            .setSize(width, height)
            .setOrigin(0.5)

        // Register pointer events
        this.setInteractive(
            new Phaser.Geom.Rectangle(-width / 2, -height / 2, width, height),
            Phaser.Geom.Rectangle.Contains
        )

        this.on('pointerdown', this.onButtonDown, this)
        this.on('pointerup', this.onButtonUp, this)
        this.on('pointerover', this.onButtonOver, this)
        this.on('pointerout', this.onButtonOut, this)

        scene.add.existing(this)
    }

    private onButtonDown() {
        this.isPointerDown = true
    }

    private onButtonUp() {
        if (this.isPointerDown) {
            this.isPointerDown = false
            this.callback()
        }
    }

    private onButtonOver() {
        this.isPointerOver = true
    }

    private onButtonOut() {
        this.isPointerOver = false
    }
}
