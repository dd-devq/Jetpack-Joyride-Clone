import { ImageObj } from '../constant/Images'
import { Button } from '../objects/Button'
import { sceneKey } from '../constant/SceneKey'

export class GameOver extends Phaser.Scene {
    public spaceKey: Phaser.Input.Keyboard.Key | undefined
    private graphics: Phaser.GameObjects.Graphics
    public quitButton: Button
    public playAgainButton: Button
    private gameLogo: Phaser.GameObjects.Image

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    init(data: any) {
        const coin = localStorage.getItem('coins')
        if (coin) {
            const newCoins = parseInt(coin) + data.coins
            localStorage.setItem('coins', newCoins.toString())
        }
    }

    create() {
        this.spaceKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        this.graphics = this.add.graphics()
        this.graphics.fillStyle(0x000000).setAlpha(0.75)
        this.graphics.fillRect(0, 0, this.scale.canvas.width, this.scale.canvas.height)
        this.graphics.setVisible(true)

        this.gameLogo = this.add.image(
            this.scale.canvas.width / 2,
            this.scale.canvas.height / 3.5,
            ImageObj.logoGlow.Key
        )

        this.playAgainButton = new Button(
            this,
            this.scale.canvas.width / 2,
            this.scale.canvas.height / 2,
            250,
            50,
            ImageObj.ButtonPlayAgain.Key,
            false,
            () => {
                this.scene.stop(sceneKey.GAMEPLAY)
                this.scene.start(sceneKey.GAMEPLAY)
            }
        )

        this.quitButton = new Button(
            this,
            this.scale.canvas.width / 2,
            this.scale.canvas.height / 1.75,
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
            this.scene.stop(sceneKey.GAMEPLAY)
            this.scene.start(sceneKey.MENU)
        }
    }
}
