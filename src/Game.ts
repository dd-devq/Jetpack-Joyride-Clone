import Phaser from 'phaser'
import { gameConfig } from './Config'
import { GameBoot } from './scenes/GameBoot'
import { GameOver } from './scenes/GameOver'
import { Gameplay } from './scenes/Gameplay'
import { MainMenu } from './scenes/MainMenu'
import { SceneKey } from './constant/SceneKey'

class TRexRunner extends Phaser.Game {
    constructor(gameConfig: Phaser.Types.Core.GameConfig) {
        super(gameConfig)
        window.addEventListener('resize', () => {
            this.resize()
        })
    }

    private resize(): void {
        // if (this.scene.getScenes(true)[0] instanceof MainMenu) {
        //     ;(<MainMenu> this.scene.getScenes(true)[0]).scaleBackground()
        // }
    }
}

const game = new TRexRunner(gameConfig)

game.scene.add(SceneKey.Boot, GameBoot)
game.scene.add(SceneKey.Gameplay, Gameplay)
game.scene.add(SceneKey.Gameover, GameOver)
game.scene.add(SceneKey.Menu, MainMenu)

game.scene.start(SceneKey.Boot)
