export class SoundManager {
    private static instance: SoundManager
    private nowPlaying: string[] = []

    public playAudio(scene: Phaser.Scene, audioKey: string, loop = false): void {
        scene.sound.add(audioKey, { loop: loop })
        scene.sound.play(audioKey)
        this.nowPlaying.push(audioKey)
    }
    public stopAudio(scene: Phaser.Scene, audioKey: string): void {
        const audioList = scene.sound.getAllPlaying()
        audioList.forEach((audio) => {
            if (audio.key === audioKey) {
                audio.stop()
            }
        })
    }

    public static getInstance(): SoundManager {
        if (!SoundManager.instance) {
            SoundManager.instance = new SoundManager()
        }
        return SoundManager.instance
    }
}
