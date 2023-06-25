import { Gameplay } from './Gameplay'
import { SceneKey } from '../constant/SceneKey'

export abstract class State<T extends Phaser.Scene> {
    public parent: T

    constructor(parent: T) {
        this.parent = parent
    }

    public abstract Enter(): void

    public abstract Update(): void

    public abstract Exit(): void
}

export class GameplayState extends State<Gameplay> {
    constructor(parent: Gameplay) {
        super(parent)
    }

    public Enter(): void {}

    public Update(): void {
        if (this.parent.escKey?.isDown) {
            this.parent.scene.pause(SceneKey.Gameplay)
            this.parent.gotoState('GamePause')
        }
    }

    public Exit(): void {
        // Gameplay cannot be pop
    }
}

export class GameplayOverState extends State<Gameplay> {
    constructor(parent: Gameplay) {
        super(parent)
    }

    public Enter(): void {
        this.parent.scene.start(SceneKey.Gameover)
    }

    public Update(): void {}

    public Exit(): void {}
}

export class GameplayPauseState extends State<Gameplay> {
    constructor(parent: Gameplay) {
        super(parent)
    }

    public Enter(): void {
        this.parent.scene.launch(SceneKey.GamePause)
    }

    public Update(): void {
        this.parent.gotoState(SceneKey.Gameplay)
    }

    public Exit(): void {
        console.log('Game Pause Exit')
    }
}
