import { ImageObj } from '../../constant/Images'
import { Stack } from '../../container/Stack'
import { BulletPool } from '../BulletPool'
import { FlyFire } from '../FlyFire'
import { State, RunState, DeadState, FlyState, FallState } from './PlayerState'

export class Player extends Phaser.Physics.Arcade.Sprite {
    public inputPointer: Phaser.Input.Pointer
    public spaceKey: Phaser.Input.Keyboard.Key | undefined

    public playerStateStack: Stack<State<Player>> = new Stack<State<Player>>()
    public playerState: Map<string, State<Player>> = new Map<string, State<Player>>()
    public flyFire: FlyFire
    public bulletPool: BulletPool

    constructor(scene: Phaser.Scene, x: number, y: number) {
        let skin = localStorage.getItem('skin')
        if (skin === null) {
            skin = ImageObj.PlayerFly.Key
            localStorage.setItem('skin', skin)
        }

        super(scene, x, y, skin)

        this.initAsset()
        this.initState()
        this.flyFire = new FlyFire(this.scene, this.x, this.y).setDepth(10)
        this.bulletPool = new BulletPool(this.scene)

        this.scene.add.existing(this)
        this.scene.physics.world.enable(this)
        this.setCollideWorldBounds(true)

        this.inputPointer = this.scene.input.activePointer
        const { SPACE } = Phaser.Input.Keyboard.KeyCodes
        this.spaceKey = this.scene.input.keyboard?.addKey(SPACE)
    }

    update() {
        this.playerStateStack.top()?.Update()
        if (this.x < (this.scene.scale.canvas.width * 0.75) / 2) {
            this.entry()
        }
        this.flyFire.setPosition(this.x - 5, this.y + 35)
    }

    private initAsset(): void {
        // TODO: Animation
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
            this.playerStateStack.top()?.Exit()
            this.playerStateStack.pop()
        }

        const playerState = this.playerState.get(state)
        if (playerState !== undefined) {
            this.playerStateStack.push(playerState)
            this.playerStateStack.top()?.Enter()
        }
    }

    public entry(): void {
        this.gotoState('Fly')
        this.x += 5
    }
}
