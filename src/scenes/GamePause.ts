import { DepthLayer } from '../constant/Animations'
import { ImageObj } from '../constant/Images'
import { sceneKey } from '../constant/SceneKey'
import { Button } from '../objects/Button'

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
        this.graphics.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height)
        this.graphics.setVisible(true)

        this.gameLogo = this.add.image(
            this.cameras.main.width / 2,
            this.cameras.main.height / 3.5,
            ImageObj.logoGlow.Key
        )

        this.quitButton = new Button(
            this,
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            250,
            50,
            ImageObj.ButtonQuit.Key,
            false,
            () => {
                this.scene.start(sceneKey.MENU)
            }
        ).setDepth(DepthLayer.UI)

        this.backButton = new Button(
            this,
            (this.cameras.main.width / 2) * 0.15,
            (this.cameras.main.height / 2) * 0.1,
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
