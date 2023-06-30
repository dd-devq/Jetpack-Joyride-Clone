import { Button } from '../objects/Button'
import { DepthLayer } from '../constant/Animations'
import { sceneKey } from '../constant/SceneKey'
import { ImageObj } from '../constant/Images'
import { Panel } from '../objects/Panel'

export class Shop extends Phaser.Scene {
    public escKey: Phaser.Input.Keyboard.Key | undefined
    private graphics: Phaser.GameObjects.Graphics
    private backButton: Button
    public panels: Panel[] = []

    create() {
        this.escKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

        this.graphics = this.add.graphics()
        this.graphics.fillStyle(0x000000).setAlpha(1)
        this.graphics.fillRect(0, 0, this.scale.canvas.width, this.scale.canvas.height)
        this.graphics.setVisible(true)

        this.backButton = new Button(
            this,
            (this.scale.canvas.width / 2) * 0.15,
            (this.scale.canvas.height / 2) * 0.1,
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
            this.panels.push(
                new Panel(
                    this,
                    this.scale.canvas.width * 0.8 - offsetX,
                    this.scale.canvas.height * 0.4 + offsetY,
                    player.price,
                    player.isUnlocked,
                    player.isUsed,
                    player.key,
                    playerKey
                )
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
