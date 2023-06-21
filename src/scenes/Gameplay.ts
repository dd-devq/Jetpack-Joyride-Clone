export class Gameplay extends Phaser.Scene {
    create() {
        this.sound.play('Gameplay')
        const background = this.add.image(
            window.innerWidth / 2,
            window.innerHeight / 2,
            'Background'
        )
        background.setOrigin(0.5, 0.5)

        const scaleX = window.innerWidth / background.width
        const scaleY = window.innerHeight / background.height
        background.setScale(scaleX, scaleY)
    }
}

abstract class State<T> {
    public parent: T

    public abstract Enter(): void

    public abstract Update(deltaTime: number): void

    public abstract Exit(): void
}

class GameplayState extends State<Gameplay> {
    public Enter(): void {}
    public Update(deltaTime: number): void {}
    public Exit(): void {}
}

class GameplayOver extends State<Gameplay> {
    public Enter(): void {}
    public Update(deltaTime: number): void {}
    public Exit(): void {}
}

class GameplayPauseState extends State<Gameplay> {
    public Enter(): void {}
    public Update(deltaTime: number): void {}
    public Exit(): void {}
}
