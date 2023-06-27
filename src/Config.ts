import { GameSettings } from './constant/Settings'

export const gameConfig = {
    type: Phaser.AUTO,
    width: GameSettings.width,
    height: GameSettings.height,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },

    dom: {
        createContainer: true,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 700 },
            debug: true,
        },
    },

    render: { pixelArt: true, antialias: false },
}
