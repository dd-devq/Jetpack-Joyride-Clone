export const gameConfig = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight,
    },
    dom: {
        createContainer: true,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 2000 },
            debugger: false,
        },
    },
    backgroundColor: '#00000',
}
