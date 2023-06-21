import { ImageName } from '../../constant/Images'
import { Vector2 } from '../../util/Math'

export class Dino extends Phaser.GameObjects.Sprite {
    body: Phaser.Physics.Arcade.Body

    constructor(scene: Phaser.Scene, position: Vector2) {
        super(scene, position.x, position.y, ImageName.dino)
    }
}
