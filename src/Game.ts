import Phaser from 'phaser'
import { gameConfig } from './Config'
import { GameBoot } from './scenes/GameBoot'
import { GameOver } from './scenes/GameOver'
import { Gameplay } from './scenes/Gameplay'
import { MainMenu } from './scenes/MainMenu'

class TRexRunner extends Phaser.Game {
    constructor(gameConfig: Phaser.Types.Core.GameConfig) {
        super(gameConfig)
    }
}

const game = new TRexRunner(gameConfig)
game.scene.add('GameBoot', GameBoot)
game.scene.add('Gameplay', Gameplay)
game.scene.add('GameOver', GameOver)
game.scene.add('MainMenu', MainMenu)
game.scene.start('GameBoot')
