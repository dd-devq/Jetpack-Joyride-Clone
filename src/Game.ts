import Phaser from 'phaser'
import { gameConfig } from './Config'
import { GameBoot } from './scenes/GameBoot'
import { GameOver } from './scenes/GameOver'
import { Gameplay } from './scenes/Gameplay'
import { MainMenu } from './scenes/MainMenu'
import { sceneKey } from './constant/SceneKey'
import { GamePause } from './scenes/GamePause'

class JetpackJoyride extends Phaser.Game {
    constructor(gameConfig: Phaser.Types.Core.GameConfig) {
        super(gameConfig)
        window.addEventListener('resize', () => {
            this.resize()
        })
    }

    private resize(): void {
        // TODO: Handler Scene for responsive
    }
}

window.addEventListener('load', () => {
    const game = new JetpackJoyride(gameConfig)

    game.scene.add(sceneKey.BOOT, GameBoot)
    game.scene.add(sceneKey.GAMEPLAY, Gameplay)
    game.scene.add(sceneKey.GAMEOVER, GameOver)
    game.scene.add(sceneKey.MENU, MainMenu)
    game.scene.add(sceneKey.GAMEPAUSE, GamePause)

    game.scene.start(sceneKey.BOOT)
})
