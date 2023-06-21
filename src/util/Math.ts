export class Vector2 {
    public x: number
    public y: number

    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }
    public scale(scalar: number): Vector2 {
        return new Vector2(this.x * scalar, this.y * scalar)
    }

    public add(vector: Vector2): Vector2 {
        return new Vector2(this.x + vector.x, this.y + vector.y)
    }

    public min(vector: Vector2): Vector2 {
        return new Vector2(this.x - vector.x, this.y - vector.y)
    }

    public div(scalar: number): Vector2 {
        return new Vector2(this.x / scalar, this.y / scalar)
    }

    public normalize(): Vector2 {
        const magnitude = this.magnitude()
        return this.div(magnitude)
    }

    public magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    public reset(): void {
        this.x = 0
        this.y = 0
    }
    public equal(vec2: Vector2): void {
        this.x = vec2.x
        this.y = vec2.y
    }
}
