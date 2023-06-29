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

    constructor(parent: Player) {
        super(parent)
    }

    public Enter(): void {
        this.jetpackAcceleration = 0
        this.parent.flyFire.setActive(true).setVisible(true)
    }

    public Update(): void {
        this.jetpackAcceleration += this.jetpackAccelerationSpeed
        if (!(this.parent.spaceKey?.isDown || this.parent.inputPointer.isDown)) {
            this.parent.gotoState('Fall')
        } else {
            this.boost()
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
