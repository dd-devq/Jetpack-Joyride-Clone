import { ImageObj } from '../constant/Images'

export class FlyFire extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, ImageObj.FlyFire.Key)
        if (!this.scene.anims.exists('flyFire')) {
            this.scene.anims.create({
                key: 'flyFire',
                frames: [{ key: ImageObj.FlyFire.Key }, { key: ImageObj.FlyFire2.Key }],
                frameRate: 10,
                repeat: -1,
            })
        }

        this.anims.play('flyFire', true)
        this.scene.add.existing(this)
    }
}
