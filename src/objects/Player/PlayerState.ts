import { AudioObj } from '../../constant/Audio'
import { SoundManager } from '../SoundManager'
import { Player } from './Player'

export abstract class State<T extends Phaser.Physics.Arcade.Sprite> {
    public parent: T
    constructor(parent: T) {
        this.parent = parent
    }

    public abstract Enter(): void

    public abstract Update(): void

    public abstract Exit(): void
}

export class RunState extends State<Player> {
    constructor(parent: Player) {
        super(parent)
    }

    public Enter(): void {
        this.parent.flyFire.setActive(false).setVisible(false)
        // Default State - No Push
    }

    public Update(): void {
        if (this.parent.spaceKey?.isDown || this.parent.inputPointer.isDown) {
            this.parent.gotoState('Fly')
        }
    }

    public Exit(): void {
        // Default State - No Pop
    }
}

export class FlyState extends State<Player> {
    private jetpackBoost = -100
    private jetpackAcceleration = 0
    private maxJetpackAcceleration = -500
    private jetpackAccelerationSpeed = -5
    private counter = 0
    private readonly INTERVAL = 6

    constructor(parent: Player) {
        super(parent)
    }

    public Enter(): void {
        this.jetpackAcceleration = 0
        this.parent.flyFire.setActive(true).setVisible(true)
    }

    public Update(): void {
        this.counter += 0.5
        this.jetpackAcceleration += this.jetpackAccelerationSpeed
        if (!(this.parent.spaceKey?.isDown || this.parent.inputPointer.isDown)) {
            this.parent.gotoState('Fall')
        } else {
            this.boost()
            if (this.counter > this.INTERVAL) {
                this.counter = 0
                this.parent.bulletPool.spawn(this.parent.x - 5, this.parent.y + 35)
                SoundManager.getInstance().playAudio(this.parent.scene, AudioObj.Fly.Key)
            }
        }
    }

    private boost(): void {
        this.jetpackAcceleration += this.jetpackAccelerationSpeed
        if (this.jetpackAcceleration < this.maxJetpackAcceleration) {
            this.jetpackAcceleration = this.maxJetpackAcceleration
        }
        this.parent.setVelocityY(this.jetpackBoost + this.jetpackAcceleration)
    }

    public Exit(): void {
        this.jetpackAcceleration = 0
        SoundManager.getInstance().stopAudio(this.parent.scene, AudioObj.Fly.Key)
    }
}

export class FallState extends State<Player> {
    constructor(parent: Player) {
        super(parent)
    }

    public Enter(): void {
        this.parent.flyFire.setActive(false).setVisible(false)
    }

    public Update(): void {
        if (this.parent.spaceKey?.isDown || this.parent.inputPointer.isDown) {
            this.parent.gotoState('Fly')
        }
        if (this.parent.body?.touching.down) {
            this.parent.gotoState('Run')
        }
    }

    public Exit(): void {
        //
    }
}

export class DeadState extends State<Player> {
    constructor(parent: Player) {
        super(parent)
    }

    public Enter(): void {
        this.parent.flyFire.setActive(false).setVisible(false)
        this.parent.setAngle(90)
    }

    public Update(): void {
        //
    }

    public Exit(): void {
        //
    }
}
