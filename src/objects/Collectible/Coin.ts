import { ImageObj } from '../../constant/Images'

export class Coin extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, ImageObj.Coin.Key)
        this.scene.add.existing(this)
    }
}
