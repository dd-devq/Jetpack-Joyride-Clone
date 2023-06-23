import { SceneKey } from '../constant/SceneKey'
import { Stack } from '../container/Stack'
import { AudioObj } from '../constant/Audio'
import { GameSettings } from '../constant/Settings'
import { GameManager } from '../objects/GameManager'

abstract class State<T extends Phaser.Scene> {
    public parent: T

    constructor(parent: T) {
        this.parent = parent
    }

    public abstract Enter(): void

    public abstract Update(): void

    public abstract Exit(): void
}

class GameplayState extends State<Gameplay> {
    constructor(parent: Gameplay) {
        super(parent)
    }

    public Enter(): void {
        const gameState = this.parent.gameState.get('Gameplay')
        if (gameState !== undefined) {
            this.parent.gameplayStack.push(gameState)
        }
    }

    public Update(): void {}

    public Exit(): void {
        // Gameplay cannot be pop
    }
}

class GameplayOverState extends State<Gameplay> {
    constructor(parent: Gameplay) {
        super(parent)
    }

    public Enter(): void {
        const gameState = this.parent.gameState.get('GameOver')
        if (gameState !== undefined) {
            this.parent.gameplayStack.push(gameState)
        }
    }

    public Update(): void {
        this.parent.scene.start(SceneKey.Gameover)
    }

    public Exit(): void {
        this.parent.gameplayStack.pop()
    }
}

class GameplayPauseState extends State<Gameplay> {
    constructor(parent: Gameplay) {
        super(parent)
    }

    public Enter(): void {
        const gameState = this.parent.gameState.get('GamePause')

        if (gameState !== undefined) {
            this.parent.gameplayStack.push(gameState)
        }
        this.parent.scene.pause()
    }

    public Update(): void {}

    public Exit(): void {
        this.parent.gameplayStack.pop()
        this.parent.scene.resume()
    }
}

export class Gameplay extends Phaser.Scene {
    public gameplayStack: Stack<State<Gameplay>> = new Stack<State<Gameplay>>()
    public gameState: Map<string, State<Gameplay>> = new Map<string, State<Gameplay>>()

    public entryAudio: Phaser.Sound.BaseSound
    public gameplayAudio: Phaser.Sound.BaseSound

    public gameManager: GameManager
    public scaleFactor = { x: 0, y: 0 }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    init(data: any) {
        this.scaleFactor = data.scaleFactor
        this.gameState.set('Gameplay', new GameplayState(this))
        this.gameState.set('GamePause', new GameplayPauseState(this))
        this.gameState.set('GameOver', new GameplayOverState(this))

        const gameState = this.gameState.get('Gameplay')
        if (gameState !== undefined) {
            this.gameplayStack.push(gameState)
        }
    }

    create() {
        this.entryAudio = this.sound.add(AudioObj.Launch.Key)
        this.gameplayAudio = this.sound.add(AudioObj.Gameplay.Key, { loop: true })
        this.playAudio()
        this.gameManager = new GameManager(this)
    }

    update(): void {
        this.gameplayStack.top()?.Update()
        this.gameManager.update()
    }

    private playAudio(): void {
        if (!GameSettings.isMute) {
            this.entryAudio.play()
            this.entryAudio.once('complete', () => {
                this.gameplayAudio.play()
            })
        }
    }
}
