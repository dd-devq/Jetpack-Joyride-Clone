import { Stack } from '../container/Stack'
import { AudioObj } from '../constant/Audio'
import { GameSettings } from '../constant/Settings'
import { GameManager } from '../objects/GameManager'
import { SoundManager } from '../objects/SoundManager'
import { GameplayOverState, GameplayPauseState, GameplayState, State } from './GameplayState'

export class Gameplay extends Phaser.Scene {
    public gameplayStack: Stack<State<Gameplay>> = new Stack<State<Gameplay>>()
    public gameState: Map<string, State<Gameplay>> = new Map<string, State<Gameplay>>()
    public escKey: Phaser.Input.Keyboard.Key | undefined

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
        const { ESC } = Phaser.Input.Keyboard.KeyCodes
        this.escKey = this.input.keyboard?.addKey(ESC)
    }

    create() {
        this.playAudio()
        this.gameManager = new GameManager(this)
    }

    update(): void {
        this.gameplayStack.top()?.Update()
    }

    public playAudio(): void {
        if (!GameSettings.isMute) {
            SoundManager.getInstance().playAudio(this, AudioObj.Launch.Key)
            SoundManager.getInstance().playAudio(this, AudioObj.Gameplay.Key, true)
        }
    }

    public stopAudio(): void {
        if (!GameSettings.isMute) {
            SoundManager.getInstance().stopAudio(this, AudioObj.Launch.Key)
            SoundManager.getInstance().stopAudio(this, AudioObj.Gameplay.Key)
        }
    }

    public gotoState(state: string) {
        if (this.gameplayStack.length() > 1) {
            this.gameplayStack.top()?.Exit()
            this.gameplayStack.pop()
        }

        const gameplayState = this.gameState.get(state)
        if (gameplayState !== undefined) {
            this.gameplayStack.push(gameplayState)
            this.gameplayStack.top()?.Enter()
        }
    }
}
