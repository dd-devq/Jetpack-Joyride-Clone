import { Player } from './Player/Player'

export class GameManager {
    public scene: Phaser.Scene
    public coinCount = 0
    public backgroundSprite: Phaser.GameObjects.TileSprite
    public invisibleBorder: number
    public coinPool: number
    public player: Player
    public readonly SCALE_CONSTANT = { x: 0, y: 0 }

    constructor(scene: Phaser.Scene) {
        this.scene = scene
        this.initBackground()
        this.initPlayer()
        this.scaleGameObject()
    }

    public update() {
        this.backgroundSprite.tilePositionX += 0.75
        this.player.update()
    }

    // Background
    private initBackground() {
        // Dynamic Background
        const { width, height } = this.scene.scale
        this.backgroundSprite = this.scene.add
            .tileSprite(0, 0, width, height, 'Background')
            .setOrigin(0)
    }

    // Player
    private initPlayer() {
        this.player = new Player(this.scene, 200, 10).setDepth(10)
    }

    // GameObject
    private scaleGameObject(): void {
        const backgroundTexture = this.scene.textures.get('Background')
        const backgroundFrame = backgroundTexture.get(0)
        const scaleX = window.innerWidth / backgroundFrame.width
        const scaleY = window.innerHeight / backgroundFrame.height
        this.SCALE_CONSTANT.x = scaleX
        this.SCALE_CONSTANT.y = scaleY
        this.backgroundSprite.setTileScale(scaleX, scaleY)
        this.player.setScale(scaleX, scaleY)
    }
}
