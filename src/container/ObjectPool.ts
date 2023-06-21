abstract class ObjectPool<T extends { active: boolean }> {
    protected scene: Phaser.Scene
    protected pool: T[]

    constructor(scene: Phaser.Scene) {
        this.scene = scene
        this.pool = []
    }

    abstract createObject(x: number, y: number): T

    acquireObject(x: number, y: number): T | undefined {
        const availableObject = this.pool.find((obj) => !obj.active)
        if (availableObject) {
            availableObject.active = true
            return availableObject
        }
        const newObject = this.createObject(x, y)
        this.pool.push(newObject)
        return newObject
    }

    disableObject(obj: T) {
        obj.active = false
    }
}

export class CoinPool extends ObjectPool<Phaser.GameObjects.Image> {
    constructor(scene: Phaser.Scene) {
        super(scene)
    }

    createObject(x: number, y: number): Phaser.GameObjects.Image {
        const coin = this.scene.add.image(x, y, 'Coin')
        // Configure other coin properties and behavior
        return coin
    }
}
