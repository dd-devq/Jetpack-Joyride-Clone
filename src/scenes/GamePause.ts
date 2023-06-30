import { DepthLayer } from '../constant/Animations'
import { ImageObj } from '../constant/Images'
import { sceneKey } from '../constant/SceneKey'
import { Button } from '../objects/Button'
import { SoundManager } from '../objects/SoundManager'

export class GamePause extends Phaser.Scene {
    public escKey: Phaser.Input.Keyboard.Key | undefined
    private graphics: Phaser.GameObjects.Graphics
    private quitButton: Button
    private backButton: Button
    private gameLogo: Phaser.GameObjects.Image

    create() {
        this.escKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

        this.graphics = this.add.graphics()
        this.graphics.fillStyle(0x000000).setAlpha(0.75)
        this.graphics.fillRect(0, 0, this.scale.canvas.width, this.scale.canvas.height)
        this.graphics.setVisible(true)

        this.gameLogo = this.add.image(
            this.scale.canvas.width / 2,
            this.scale.canvas.height / 3.5,
            ImageObj.logoGlow.Key
        )

        this.quitButton = new Button(
            this,
            this.scale.canvas.width / 2,
            this.scale.canvas.height / 2,
            250,
            50,
            ImageObj.ButtonQuit.Key,
            false,
            () => {
                this.scene.stop(sceneKey.GAMEPLAY)
                const scene = this.scene.get(sceneKey.GAMEPLAY)
                SoundManager.getInstance().stopAllAudio(scene)
                this.scene.start(sceneKey.MENU)
            }
        ).setDepth(DepthLayer.UI)

        this.backButton = new Button(
            this,
            (this.scale.canvas.width / 2) * 0.15,
            (this.scale.canvas.height / 2) * 0.1,
            200,
            50,
            ImageObj.ButtonBack.Key,
            false,
            () => {
                this.scene.stop(sceneKey.GAMEPAUSE)
                this.scene.resume(sceneKey.GAMEPLAY)
            }
        ).setDepth(DepthLayer.UI)
    }

    update() {
        if (this.escKey?.isDown) {
            this.scene.stop(sceneKey.GAMEPAUSE)
            this.scene.resume(sceneKey.GAMEPLAY)
        }
    }
}
