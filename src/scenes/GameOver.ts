import { SceneKey } from '../constant/SceneKey'
import { Button } from '../objects/Button'

export class GameOver extends Phaser.Scene {
    public spaceKey: Phaser.Input.Keyboard.Key | undefined
    public quitButton: Button

    create() {
        this.spaceKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.quitButton = new Button(this, 500, 500, 100, 100, 'Home')
    }
    update() {
        if (this.spaceKey?.isDown) {
            this.scene.start(SceneKey.Menu)
        }
        if(this.quitButton.)
    }
}
