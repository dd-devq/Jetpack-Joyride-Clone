import { AudioObj } from '../constant/Audio'
import { ImageObj } from '../constant/Images'
import { GameSettings } from '../constant/Settings'
import { SoundManager } from '../objects/SoundManager'
import { sceneKey } from '../constant/SceneKey'
import { Button } from '../objects/Button'
import { DepthLayer } from '../constant/Animations'

export class MainMenu extends Phaser.Scene {
    private backgroundImage: Phaser.GameObjects.Image
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys
    private startButton: Button
    private shopButton: Button
    private gameLogo: Phaser.GameObjects.Image
    public textCoin: Phaser.GameObjects.Text

    create() {
        const coin = localStorage.getItem('coins')
        this.textCoin = this.add
            .text(this.scale.canvas.width / 2, this.scale.canvas.height * 0.1, 'Coins: ' + coin, {
                fontSize: '36px',
                color: '#f7f7f7',
                fontFamily: 'Arial',
                fontStyle: 'bold',
                align: 'center',
                padding: {
                    left: 10,
                    right: 10,
                    top: 5,
                    bottom: 5,
                },
            })
            .setDepth(DepthLayer.UI)
            .setOrigin(0.5)

        const keyboard = this.input.keyboard
        if (keyboard) {
            this.cursors = keyboard.createCursorKeys()
        }

        if (!GameSettings.isMute) {
            SoundManager.getInstance().playAudio(this, AudioObj.MainMenu.Key, true)
        }

        this.backgroundImage = this.add
            .image(
                this.scale.canvas.width / 2,
                this.scale.canvas.height / 2,
                ImageObj.Background.Key
            )
            .setAlpha(0.8)

        this.gameLogo = this.add
            .image(
                this.scale.canvas.width / 2,
                this.scale.canvas.height / 3.5,
                ImageObj.logoGlow.Key
            )
            .setAlpha(0.9)

        this.scaleBackground()

        this.startButton = new Button(
            this,
            this.scale.canvas.width / 2,
            this.scale.canvas.height / 2,
            350,
            50,
            ImageObj.ButtonPlayGame.Key,
            false,
            () => {
                this.scene.start(sceneKey.GAMEPLAY)
                SoundManager.getInstance().stopAudio(this, AudioObj.MainMenu.Key)
            }
        ).setDepth(DepthLayer.UI)

        this.shopButton = new Button(
            this,
            this.scale.canvas.width / 2,
            this.scale.canvas.height / 1.75,
            350,
            50,
            ImageObj.ButtonShop.Key,
            false,
            () => {
                this.scene.launch(sceneKey.SHOP)
                this.scene.pause(sceneKey.MENU)
            }
        ).setDepth(DepthLayer.UI)
    }

    update() {
        if (this.cursors.space?.isDown) {
            this.scene.start(sceneKey.GAMEPLAY)
            SoundManager.getInstance().stopAudio(this, AudioObj.MainMenu.Key)
        }
    }

    public scaleBackground(): void {
        const scaleX = this.scale.canvas.width / this.backgroundImage.width
        const scaleY = this.scale.canvas.height / this.backgroundImage.height
        this.backgroundImage.setScale(scaleX, scaleY)
    }
}
