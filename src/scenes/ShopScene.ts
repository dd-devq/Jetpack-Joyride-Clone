import { Button } from '../objects/Button'
import { DepthLayer } from '../constant/Animations'
import { sceneKey } from '../constant/SceneKey'
import { ImageObj } from '../constant/Images'
import { MainMenu } from './MainMenu'

export class Shop extends Phaser.Scene {
    public escKey: Phaser.Input.Keyboard.Key | undefined
    private graphics: Phaser.GameObjects.Graphics
    private backButton: Button
    create() {
        this.escKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

        this.graphics = this.add.graphics()
        this.graphics.fillStyle(0x000000).setAlpha(1)
        this.graphics.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height)
        this.graphics.setVisible(true)

        this.backButton = new Button(
            this,
            (this.cameras.main.width / 2) * 0.15,
            (this.cameras.main.height / 2) * 0.1,
            200,
            50,
            ImageObj.ButtonBack.Key,
            false,
            () => {
                this.scene.stop(sceneKey.SHOP)
                this.scene.resume(sceneKey.MENU)
            }
        ).setDepth(DepthLayer.UI)

        const data = localStorage.getItem('playerData')

        let playerData: {
            [key: string]: { key: string; isUnlocked: boolean; isUsed: boolean; price: number }
        } = {
            default: {
                key: ImageObj.PlayerFly.Key,
                isUnlocked: true,
                isUsed: true,
                price: 200,
            },
            green: {
                key: ImageObj.playerGreen.key,
                isUnlocked: false,
                isUsed: false,
                price: 200,
            },
            pink: {
                key: ImageObj.playerPink.key,
                isUnlocked: false,
                isUsed: false,
                price: 200,
            },
            red: {
                key: ImageObj.playerRed.key,
                isUnlocked: false,
                isUsed: false,
                price: 200,
            },
            orange: {
                key: ImageObj.playerOrange.key,
                isUnlocked: false,
                isUsed: false,
                price: 200,
            },
            yellow: {
                key: ImageObj.playerYellow.key,
                isUnlocked: false,
                isUsed: false,
                price: 200,
            },
            perry: {
                key: ImageObj.playerPerry.key,
                isUnlocked: false,
                isUsed: false,
                price: 200,
            },
        }
        if (data !== null) {
            playerData = JSON.parse(data)
        }

        let offsetX = 0
        const panelOffsetX = 300
        const panelOffsetY = 350
        let offsetY = 0
        let counter = 0

        Object.keys(playerData).forEach((playerKey) => {
            const player = playerData[playerKey]
            if (counter >= 4) {
                offsetY += panelOffsetY
                offsetX = 0
                counter = 0
            }
            new Panel(
                this,
                1400 - offsetX,
                400 + offsetY,
                player.price,
                player.isUnlocked,
                player.isUsed,
                player.key
            )
            counter += 1
            offsetX += panelOffsetX
        })
    }

    update(): void {
        if (this.escKey?.isDown) {
            this.scene.stop(sceneKey.SHOP)
            this.scene.resume(sceneKey.MENU)
        }
    }
}

class Panel extends Phaser.GameObjects.Container {
    private price: Phaser.GameObjects.Text
    private priceNum: number
    private player: Phaser.GameObjects.Image
    private button: Button
    private isBought: boolean
    private isSelected: boolean

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        price: number,
        isBought: boolean,
        isSelected: boolean,
        playerKey: string
    ) {
        super(scene, x, y)
        scene.add.existing(this)
        this.priceNum = price
        this.isBought = isBought
        this.isSelected = isSelected

        this.player = this.scene.add.image(0, -100, playerKey).setScale(2)
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
            this.setAlpha(0.5)
        }

        if (!this.isSelected) {
            this.button.sprite.setAlpha(0.5)
        }

        this.add(this.player)
        this.add(this.price)
    }

    private onClickHandle = (): void => {
        if (!this.isSelected && this.isBought) {
            this.isSelected = true
            this.button.sprite.setTexture(ImageObj.ButtonSelect.Key)
        }

        if (!this.isBought) {
            const coins = localStorage.getItem('coins')
            if (coins !== null) {
                if (parseInt(coins) >= this.priceNum) {
                    localStorage.setItem('coins', (parseInt(coins) - this.priceNum).toString())
                    ;(this.scene.scene.get(sceneKey.MENU) as MainMenu).textCoin.setText(
                        (parseInt(coins) - this.priceNum).toString()
                    )
                }
            }
            this.isBought = true
            this.button.sprite.setTexture(ImageObj.ButtonSelect.Key)
        }
    }
}
