import { SceneKey } from '../constant/SceneKey'

export class GamePause extends Phaser.Scene {
    public escKey: Phaser.Input.Keyboard.Key | undefined

    create() {
        this.escKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
    }
    update() {
        if (this.escKey?.isDown) {
            this.scene.stop(SceneKey.GamePause)
            this.scene.resume(SceneKey.Gameplay)
        }
    }
}
