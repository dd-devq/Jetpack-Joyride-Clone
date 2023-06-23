import { AudioObj } from '../constant/Audio'
import { ImageObj } from '../constant/Images'
import { SceneKey } from '../constant/SceneKey'
import { GameSettings } from '../constant/Settings'

export class MainMenu extends Phaser.Scene {
    private backgroundAudio: Phaser.Sound.BaseSound
    private backgroundImage: Phaser.GameObjects.Image
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys
    private scaleFactor = { x: 0, y: 0 }

    create() {
        const keyboardPlugin = this.input.keyboard
        if (keyboardPlugin) {
            this.cursors = keyboardPlugin.createCursorKeys()
        }

        this.backgroundAudio = this.sound.add(AudioObj.MainMenu.Key, { loop: true })
        this.playAudio()
        this.backgroundImage = this.add.image(
            window.innerWidth / 2,
            window.innerHeight / 2,
            ImageObj.Background.Key
        )

        this.scaleBackground()
    }

    update() {
        if (this.cursors.left?.isDown) {
            this.scene.start(SceneKey.Gameplay, { scaleFactor: this.scaleFactor })
            this.backgroundAudio.stop()
        }
    }

    private playAudio(): void {
        if (!GameSettings.isMute) {
            this.backgroundAudio.play()
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
