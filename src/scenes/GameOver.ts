import { ImageObj } from '../constant/Images'
import { Button } from '../objects/Button'
import { sceneKey } from '../constant/SceneKey'

export class GameOver extends Phaser.Scene {
    public spaceKey: Phaser.Input.Keyboard.Key | undefined
    private graphics: Phaser.GameObjects.Graphics
    public quitButton: Button

    create() {
        this.spaceKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        this.graphics = this.add.graphics()
        this.graphics.fillStyle(0x000000).setAlpha(0.75)
        this.graphics.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height)
        this.graphics.setVisible(true)

        this.quitButton = new Button(
            this,
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            250,
            50,
            ImageObj.ButtonQuit.Key,
            false,
            () => {
                this.scene.stop(sceneKey.GAMEPLAY)
                this.scene.start(sceneKey.MENU)
            }
        )
    }

    update() {
        if (this.spaceKey?.isDown) {
            this.scene.start(sceneKey.MENU)
        }
    }
}
