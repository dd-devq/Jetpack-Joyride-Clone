import { Stack } from '../container/Stack'
import { AudioObj } from '../constant/Audio'
import { GameSettings } from '../constant/Settings'
import { GameManager } from '../objects/GameManager'
import { SoundManager } from '../objects/SoundManager'
import { GameplayOverState, GameplayPauseState, GameplayState, State } from './GameplayState'
import { DepthLayer } from '../constant/Animations'

export class Gameplay extends Phaser.Scene {
    public gameplayStack: Stack<State<Gameplay>> = new Stack<State<Gameplay>>()
    public gameState: Map<string, State<Gameplay>> = new Map<string, State<Gameplay>>()
    public escKey: Phaser.Input.Keyboard.Key | undefined
    public textCoin: Phaser.GameObjects.Text

    public gameManager: GameManager

    init() {
        this.gameState.set('Gameplay', new GameplayState(this))
        this.gameState.set('GamePause', new GameplayPauseState(this))
        this.gameState.set('GameOver', new GameplayOverState(this))

        const gameState = this.gameState.get('Gameplay')
        if (gameState !== undefined) {
            this.gameplayStack.push(gameState)
        }
    }
    preload() {
        this.load.tilemapTiledJSON('map-1', 'assets\\Map\\Map1.json')
        this.load.tilemapTiledJSON('map-2', 'assets\\Map\\Map2.json')
        this.load.tilemapTiledJSON('map-3', 'assets\\Map\\Map3.json')
    }
    create() {
        this.playAudio()
        const { ESC } = Phaser.Input.Keyboard.KeyCodes
        this.escKey = this.input.keyboard?.addKey(ESC)
        this.gameManager = new GameManager(this)

        this.textCoin = this.add
            .text(
                this.scale.canvas.width / 2,
                this.scale.canvas.height * 0.1,
                'Coins: ' + this.gameManager.coinCount,
                {
                    fontSize: '36px',
                    color: '#f7f7f7',
                    fontFamily: 'Arial',
                    fontStyle: 'bold',
                    align: 'center',
                    padding: {
                        left: 10,
                        right: 10,
                        top: 5,
                        bottom: 5,
                    },
                }
            )
            .setDepth(DepthLayer.UI)
            .setOrigin(0.5)
    }

    update(): void {
        this.gameplayStack.top()?.Update()
    }

    public playAudio(): void {
        if (!GameSettings.isMute) {
            SoundManager.getInstance().playAudio(this, AudioObj.Launch.Key)
            SoundManager.getInstance().playAudio(this, AudioObj.Gameplay.Key, true, 0.1)
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
