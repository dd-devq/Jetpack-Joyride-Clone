import { Gameplay } from './Gameplay'
import { sceneKey } from '../constant/SceneKey'

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

    public Enter(): void {
        // Push on stack by default
    }

    public Update(): void {
        if (this.parent.escKey?.isDown) {
            this.parent.scene.pause(sceneKey.GAMEPLAY)
            this.parent.gotoState('GamePause')
        }
        this.parent.gameManager.update()
    }

    public Exit(): void {
        // Gameplay can not be pop
    }
}

export class GameplayOverState extends State<Gameplay> {
    constructor(parent: Gameplay) {
        super(parent)
    }

    public Enter(): void {
        this.parent.stopAudio()

        setTimeout(() => {
            this.parent.scene.pause(sceneKey.GAMEPLAY)
        }, 1200)

        this.parent.scene.launch(sceneKey.GAMEOVER, { coins: this.parent.gameManager.coinCount })
    }

    public Update(): void {
        //
    }

    public Exit(): void {
        //
    }
}

export class GameplayPauseState extends State<Gameplay> {
    constructor(parent: Gameplay) {
        super(parent)
    }

    public Enter(): void {
        this.parent.scene.launch(sceneKey.GAMEPAUSE)
    }

    public Update(): void {
        this.parent.gotoState(sceneKey.GAMEPLAY)
    }

    public Exit(): void {
        //
    }
}
