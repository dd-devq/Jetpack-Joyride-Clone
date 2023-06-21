import { AudioObj } from '../constant/Audio'
import { SceneKey } from '../constant/SceneKey'
import { GameSettings } from '../constant/Settings'

export class MainMenu extends Phaser.Scene {
    private backgroundMusic: Phaser.Sound.BaseSound
    private backgroundImage: Phaser.GameObjects.Image
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys

    create() {
        const keyboardPlugin = this.input.keyboard
        if (keyboardPlugin) {
            this.cursors = keyboardPlugin.createCursorKeys()
        }

        this.backgroundMusic = this.sound.add(AudioObj.MainMenu.Key, { loop: true })
        this.playAudio()

        this.backgroundImage = this.add.image(
            this.scale.width / 2,
            this.scale.height / 2,
            'Background'
        )
        this.scaleBackground()
    }

    update() {
        if (this.cursors.left?.isDown) {
            this.scene.start(SceneKey.Gameplay)
            this.backgroundMusic.stop()
        } else if (this.cursors.right?.isDown) {
            // Perform actions for right arrow key press
        }
    }

    private playAudio(): void {
        if (!GameSettings.isMute) {
            this.backgroundMusic.play()
        }
    }

    private scaleBackground(): void {
        this.backgroundImage.setOrigin(0.5)
        const scaleX = window.innerWidth / this.backgroundImage.width
        const scaleY = window.innerHeight / this.backgroundImage.height
        this.backgroundImage.setScale(scaleX, scaleY)
    }
}
