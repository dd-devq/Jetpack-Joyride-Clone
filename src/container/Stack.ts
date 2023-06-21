export class Stack<T> {
    private data: T[] = []

    public push(value: T): void {
        this.data.push(value)
    }

    public pop(): T | undefined {
        return this.data.pop()
    }

    public top(): T | undefined {
        return this.data[this.data.length - 1]
    }
}
