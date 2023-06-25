import { SceneKey } from '../constant/SceneKey'

export class GameOver extends Phaser.Scene {
    public spaceKey: Phaser.Input.Keyboard.Key | undefined

    create() {
        this.spaceKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }
    update() {
        if (this.spaceKey?.isDown) {
            this.scene.start(SceneKey.Menu)
        }
    }
}
