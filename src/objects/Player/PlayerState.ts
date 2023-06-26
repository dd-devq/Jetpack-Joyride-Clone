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
    private jetpackBoost = -150
    private jetpackAcceleration = 0
    private jetpackAccelerationSpeed = -10
    constructor(parent: Player) {
        super(parent)
    }

    public Enter(): void {}

    public Update(): void {
        this.jetpackAcceleration += this.jetpackAccelerationSpeed
        if (!(this.parent.spaceKey?.isDown || this.parent.inputPointer.isDown)) {
            this.parent.gotoState('Fall')
        } else {
            this.boost()
        }
    }

    private boost(): void {
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

    public Enter(): void {}

    public Update(): void {
        if (this.parent.spaceKey?.isDown || this.parent.inputPointer.isDown) {
            this.parent.gotoState('Fly')
        }
        if (this.parent.body?.touching.down) {
            this.parent.gotoState('Run')
        }
    }

    public Exit(): void {}
}

export class DeadState extends State<Player> {
    constructor(parent: Player) {
        super(parent)
    }

    public Enter(): void {}

    public Update(): void {}

    public Exit(): void {}
}
