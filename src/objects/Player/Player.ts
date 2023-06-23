import { ImageObj } from '../../constant/Images'
import { Stack } from '../../container/Stack'

export class Player extends Phaser.Physics.Arcade.Sprite {
    public inputPointer: Phaser.Input.Pointer
    public spaceKey: Phaser.Input.Keyboard.Key | undefined

    public playerStateStack: Stack<State<Player>> = new Stack<State<Player>>()
    public playerState: Map<string, State<Player>> = new Map<string, State<Player>>()

    public platforms: Phaser.Physics.Arcade.StaticGroup

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, ImageObj.PlayerFly.Key)
        this.initState()

        this.scene.add.existing(this)
        this.scene.physics.world.enable(this)

        this.inputPointer = this.scene.input.activePointer
        const { SPACE } = Phaser.Input.Keyboard.KeyCodes
        this.spaceKey = this.scene.input.keyboard?.addKey(SPACE)
    }

    update() {
        this.playerStateStack.top()?.Update()
    }

    private initState(): void {
        this.playerState.set('Run', new RunState(this))
        this.playerState.set('Fly', new FlyState(this))
        this.playerState.set('Fall', new FallState(this))
        this.playerState.set('Dead', new DeadState(this))

        const playerState = this.playerState.get('Run')
        if (playerState !== undefined) {
            this.playerStateStack.push(playerState)
        }
    }

    public gotoState(state: string) {
        if (this.playerStateStack.length() > 1) {
            this.playerStateStack.top()?.Exit
            this.playerStateStack.pop()
        }

        const playerState = this.playerState.get(state)
        if (playerState !== undefined) {
            this.playerStateStack.push(playerState)
            this.playerStateStack.top()?.Enter()
        }
    }
}

abstract class State<T extends Phaser.GameObjects.Sprite> {
    public parent: T
    constructor(parent: T) {
        this.parent = parent
    }

    public abstract Enter(): void

    public abstract Update(): void

    public abstract Exit(): void
}

class RunState extends State<Player> {
    constructor(parent: Player) {
        super(parent)
    }

    public Enter(): void {}

    public Update(): void {
        if (this.parent.spaceKey?.isDown || this.parent.inputPointer.isDown) {
            this.parent.gotoState('Fly')
        }
    }

    public Exit(): void {
        // Default State - No Pop
    }
}

class FlyState extends State<Player> {
    private jetpackBoost = -250

    constructor(parent: Player) {
        super(parent)
    }

    public Enter(): void {}

    public Update(): void {
        if (!(this.parent.spaceKey?.isDown || this.parent.inputPointer.isDown)) {
            this.parent.gotoState('Fall')
        } else {
            this.boost()
        }
    }

    private boost(): void {
        this.parent.setVelocityY(this.jetpackBoost)
    }

    public Exit(): void {}
}

class FallState extends State<Player> {
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

class DeadState extends State<Player> {
    constructor(parent: Player) {
        super(parent)
    }

    public Enter(): void {}

    public Update(): void {}

    public Exit(): void {}
}
