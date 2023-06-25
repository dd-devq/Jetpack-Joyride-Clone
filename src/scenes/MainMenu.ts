import { AudioObj } from '../constant/Audio'
import { ImageObj } from '../constant/Images'
import { SceneKey } from '../constant/SceneKey'
import { GameSettings } from '../constant/Settings'
import { SoundManager } from '../objects/SoundManager'

export class MainMenu extends Phaser.Scene {
    private backgroundImage: Phaser.GameObjects.Image
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys
    private scaleFactor = { x: 0, y: 0 }

    create() {
        const keyboardPlugin = this.input.keyboard
        if (keyboardPlugin) {
            this.cursors = keyboardPlugin.createCursorKeys()
        }

        if (!GameSettings.isMute) {
            SoundManager.getInstance().playAudio(this, AudioObj.MainMenu.Key, true)
        }

        this.backgroundImage = this.add.image(
            window.innerWidth / 2,
            window.innerHeight / 2,
            ImageObj.Background.Key
        )

        this.scaleBackground()
    }

    update() {
        if (this.cursors.space?.isDown) {
            this.scene.start(SceneKey.Gameplay, { scaleFactor: this.scaleFactor })
            SoundManager.getInstance().stopAudio(this, AudioObj.MainMenu.Key)
        }
    }

    public scaleBackground(): void {
        const scaleX = window.innerWidth / this.backgroundImage.width
        const scaleY = window.innerHeight / this.backgroundImage.height
        this.backgroundImage.setScale(scaleX, scaleY)
        this.scaleFactor.x = scaleX
        this.scaleFactor.y = scaleY
    }
}
