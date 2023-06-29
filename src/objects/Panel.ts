import { Button } from './Button'
import { sceneKey } from '../constant/SceneKey'
import { ImageObj } from '../constant/Images'
import { MainMenu } from '../scenes/MainMenu'
import { Shop } from '../scenes/ShopScene'
import { SoundManager } from './SoundManager'
import { AudioObj } from '../constant/Audio'

export class Panel extends Phaser.GameObjects.Container {
    private price: Phaser.GameObjects.Text
    private priceNum: number
    private panelKey: string
    private player: Phaser.GameObjects.Image
    private button: Button
    private isBought: boolean
    private isSelected: boolean
    private playerKey: string
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        price: number,
        isBought: boolean,
        isSelected: boolean,
        playerKey: string,
        panelKey: string
    ) {
        super(scene, x, y)
        scene.add.existing(this)
        this.priceNum = price
        this.isBought = isBought
        this.isSelected = isSelected
        this.panelKey = panelKey

        this.player = this.scene.add.image(0, -100, playerKey).setScale(2)
        this.playerKey = playerKey
        this.price = this.scene.add
            .text(0, -200, price.toString(), {
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
            .setOrigin(0.5)

        if (this.isBought) {
            this.button = new Button(
                this.scene,
                this.x,
                this.y,
                250,
                50,
                ImageObj.ButtonSelect.Key,
                false,
                this.onClickHandle
            )
        } else {
            this.button = new Button(
                this.scene,
                this.x,
                this.y,
                250,
                50,
                ImageObj.ButtonBuy.Key,
                false,
                this.onClickHandle
            )
        }

        if (!this.isSelected) {
            this.button.sprite.setAlpha(0.5)
            this.setAlpha(0.5)
        }

        this.add(this.player)
        this.add(this.price)
    }

    private onClickHandle = (): void => {
        if (!this.isSelected && this.isBought) {
            const panels = (this.scene.scene.get(sceneKey.SHOP) as Shop).panels
            panels.forEach((panel) => {
                panel.isSelected = false
                panel.setAlpha(0.5)
                panel.button.sprite.setAlpha(0.5)
            })
            this.isSelected = true
            localStorage.setItem('skin', this.playerKey)

            this.setAlpha(1)
            this.button.sprite.setAlpha(1)
            SoundManager.getInstance().playAudio(this.scene, AudioObj.Coin.Key, false)
        }

        if (!this.isBought) {
            const coins = localStorage.getItem('coins')
            if (coins !== null) {
                if (parseInt(coins) >= this.priceNum) {
                    localStorage.setItem('coins', (parseInt(coins) - this.priceNum).toString())
                    ;(this.scene.scene.get(sceneKey.MENU) as MainMenu).textCoin.setText(
                        (parseInt(coins) - this.priceNum).toString()
                    )
                    this.isBought = true
                    this.button.sprite.setTexture(ImageObj.ButtonSelect.Key)
                    SoundManager.getInstance().playAudio(this.scene, AudioObj.Coin.Key, false)
                } else {
                    SoundManager.getInstance().playAudio(this.scene, AudioObj.Wrong.Key, false)
                }
            }
        }
        this.updatePlayerData()
    }

    updatePlayerData(): void {
        const data = localStorage.getItem('playerData')

        if (data !== null) {
            const playerData = JSON.parse(data)

            Object.keys(playerData).forEach((playerKey) => {
                const player = playerData[playerKey]
                player.isUsed = false
            })

            playerData[this.panelKey].isUnlocked = this.isBought
            playerData[this.panelKey].isUsed = this.isSelected

            localStorage.setItem('playerData', JSON.stringify(playerData))
        }
    }
}
