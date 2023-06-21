import { SceneKey } from '../constant/SceneKey'
import { Stack } from '../container/Stack'
import { AudioObj } from '../constant/Audio'
import { GameSettings } from '../constant/Settings'
import { Player } from '../objects/Player/Player'
abstract class State<T extends Phaser.Scene> {
    public parent: T

    constructor(parent: T) {
        this.parent = parent
    }

    public abstract Enter(): void

    public abstract Update(time: number, delta: number): void

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

    public Update(time: number, delta: number): void {}

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

    public Update(time: number, delta: number): void {
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
    }

    public Update(time: number, delta: number): void {}

    public Exit(): void {
        this.parent.gameplayStack.pop()
    }
}

export class Gameplay extends Phaser.Scene {
    public gameplayStack: Stack<State<Gameplay>> = new Stack<State<Gameplay>>()
    public gameState: Map<string, State<Gameplay>> = new Map<string, State<Gameplay>>()
    public backgroundSprite: Phaser.GameObjects.TileSprite
    public entryAudio: Phaser.Sound.BaseSound
    public gameplayAudio: Phaser.Sound.BaseSound
    private gameWorldOffset = { CEILING: 750, GROUND: 200 }

    private player: Player
    init() {
        this.gameState.set('Gameplay', new GameplayState(this))
        this.gameState.set('GamePause', new GameplayPauseState(this))
        this.gameState.set('GameOver', new GameplayOverState(this))

        const gameState = this.gameState.get('Gameplay')
        if (gameState !== undefined) {
            this.gameplayStack.push(gameState)
        }
    }

    create() {
        this.physics.world.setBounds(
            window.innerWidth * 0.15,
            window.innerHeight * 0.15,
            window.innerWidth * 0.8,
            window.innerHeight * 0.75
        )

        this.entryAudio = this.sound.add(AudioObj.Launch.Key)
        this.gameplayAudio = this.sound.add(AudioObj.Gameplay.Key, { loop: true })

        this.playAudio()
        const { width, height } = this.scale
        this.backgroundSprite = this.add.tileSprite(0, 0, width, height, 'Background').setOrigin(0)
        this.scaleBackground()
        this.player = new Player(this, 200, 100)
    }

    update(time: number, delta: number): void {
        this.backgroundSprite.tilePositionX += 1
        this.gameplayStack.top()?.Update(time, delta)
        this.player.update()
    }

    private playAudio(): void {
        if (!GameSettings.isMute) {
            this.entryAudio.play()
            this.entryAudio.once('complete', () => {
                this.gameplayAudio.play()
            })
        }
    }

    private scaleBackground(): void {
        const backgroundTexture = this.textures.get('Background')
        const backgroundFrame = backgroundTexture.get(0)
        const scaleX = window.innerWidth / backgroundFrame.width
        const scaleY = window.innerHeight / backgroundFrame.height
        this.backgroundSprite.setTileScale(scaleX, scaleY)
    }
}
