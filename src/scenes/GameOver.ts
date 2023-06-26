import { SceneKey } from '../constant/SceneKey'
import { Button } from '../objects/Button'

export class GameOver extends Phaser.Scene {
    public spaceKey: Phaser.Input.Keyboard.Key | undefined
    public quitButton: Button

    create() {
        this.spaceKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.quitButton = new Button(this, 100, 100, 'Home', () => {
            console.log('Hello')
            this.scene.start(SceneKey.Menu)
        })
    }
    update() {
        if (this.spaceKey?.isDown) {
            this.scene.start(SceneKey.Menu)
        }
    }
}
