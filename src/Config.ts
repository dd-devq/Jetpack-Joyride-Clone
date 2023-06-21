export const gameConfig = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scale: {
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
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
