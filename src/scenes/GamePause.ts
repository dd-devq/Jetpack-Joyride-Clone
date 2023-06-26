import { SceneKey } from '../constant/SceneKey'

export class GamePause extends Phaser.Scene {
    public escKey: Phaser.Input.Keyboard.Key | undefined
    private graphics: Phaser.GameObjects.Graphics

    create() {
        this.escKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

        this.graphics = this.add.graphics()

        // Set the fill style to black
        this.graphics.fillStyle(0x000000).setAlpha(0.75)

        // Create a rectangle that covers the entire screen
        this.graphics.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height)

        // Set the initial visibility to true (pitch black)
        this.graphics.setVisible(true)
    }
    update() {
        if (this.escKey?.isDown) {
            this.scene.stop(SceneKey.GamePause)
            this.scene.resume(SceneKey.Gameplay)
        }
    }
}
