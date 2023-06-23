import { AudioObj } from '../constant/Audio'
import { SceneKey } from '../constant/SceneKey'
import { ImageObj } from '../constant/Images'

export class GameBoot extends Phaser.Scene {
    preload() {
        // Progress Bar
        const barWidth = 320
        const barHeight = 50

        const progressBar = this.add.graphics()
        const progressBox = this.add.graphics()

        progressBox.fillStyle(0x222222, 0.75)
        progressBox.fillRect(
            (window.innerWidth - barWidth) / 2,
            (window.innerHeight - barHeight) / 2,
            barWidth,
            barHeight
        )

        const width = this.cameras.main.width
        const height = this.cameras.main.height

        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '24px monospace',
                color: '#ffffff',
            },
        })
        loadingText.setOrigin(0.5, 0.5)

        const percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                color: '#ffffff',
            },
        })
        percentText.setOrigin(0.5, 0.5)

        const assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                color: '#ffffff',
            },
        })
        assetText.setOrigin(0.5, 0.5)

        this.load.on('progress', (value: number) => {
            percentText.setText(parseInt(String(value * 100)) + '%')
            progressBar.clear()
            progressBar.fillStyle(0xffffff, 1)
            progressBar.fillRect(
                (window.innerWidth - barWidth) / 2,
                (window.innerHeight - barHeight) / 2,
                barWidth * value,
                barHeight
            )
        })

        this.load.on('fileprogress', (file: Phaser.Loader.File) => {
            assetText.setText('Loading asset: ' + file.key)
        })

        this.load.on('complete', () => {
            progressBar.destroy()
            progressBox.destroy()
            loadingText.destroy()
            percentText.destroy()
            assetText.destroy()
        })

        // Loading Image Asset
        this.load.image(ImageObj.SunLogo.Key, ImageObj.SunLogo.Path)
        this.load.image(ImageObj.GameLogo.Key, ImageObj.GameLogo.Path)
        this.load.image(ImageObj.Background.Key, ImageObj.Background.Path)
        this.load.image(ImageObj.Bullet.Key, ImageObj.Bullet.Path)
        this.load.image(ImageObj.BulletCollision.Key, ImageObj.BulletCollision.Path)
        this.load.image(ImageObj.ButtonBack.Key, ImageObj.ButtonBack.Path)
        this.load.image(ImageObj.ButtonBuy.Key, ImageObj.ButtonBuy.Path)
        this.load.image(ImageObj.ButtonCreadits.Key, ImageObj.ButtonCreadits.Path)
        this.load.image(ImageObj.ButtonMusicOff.Key, ImageObj.ButtonMusicOff.Path)
        this.load.image(ImageObj.ButtonMusicOn.Key, ImageObj.ButtonMusicOn.Path)
        this.load.image(ImageObj.ButtonPlayAgain.Key, ImageObj.ButtonPlayAgain.Path)
        this.load.image(ImageObj.ButtonPlayGame.Key, ImageObj.ButtonPlayGame.Path)
        this.load.image(ImageObj.ButtonQuit.Key, ImageObj.ButtonQuit.Path)
        this.load.image(ImageObj.ButtonSelect.Key, ImageObj.ButtonSelect.Path)
        this.load.image(ImageObj.ButtonShop.Key, ImageObj.ButtonShop.Path)
        this.load.image(ImageObj.ButtonShopDeadScreen.Key, ImageObj.ButtonShopDeadScreen.Path)
        this.load.image(ImageObj.ButtonSoundOff.Key, ImageObj.ButtonSoundOff.Path)
        this.load.image(ImageObj.ButtonSoundOn.Key, ImageObj.ButtonSoundOn.Path)
        this.load.image(ImageObj.Coin.Key, ImageObj.Coin.Path)
        this.load.image(ImageObj.FlyFire.Key, ImageObj.FlyFire.Path)
        this.load.image(ImageObj.FlyFire2.Key, ImageObj.FlyFire2.Path)
        this.load.image(ImageObj.icon.Key, ImageObj.icon.Path)
        this.load.image(ImageObj.logoGlow.Key, ImageObj.logoGlow.Path)
        this.load.image(ImageObj.LogoSmall.Key, ImageObj.LogoSmall.Path)
        this.load.image(ImageObj.Menu.Key, ImageObj.Menu.Path)
        this.load.image(ImageObj.PlayerDead.Key, ImageObj.PlayerDead.Path)
        this.load.image(ImageObj.PlayerFly.Key, ImageObj.PlayerFly.Path)
        this.load.image(ImageObj.Rocket.Key, ImageObj.Rocket.Path)
        this.load.image(ImageObj.RocketWarning.Key, ImageObj.RocketWarning.Path)
        this.load.image(ImageObj.SoundOff.Key, ImageObj.SoundOff.Path)
        this.load.image(ImageObj.SoundOn.Key, ImageObj.SoundOn.Path)
        this.load.image(ImageObj.SplashArt.Key, ImageObj.SplashArt.Path)
        this.load.image(ImageObj.Zapper1.Key, ImageObj.Zapper1.Path)
        this.load.image(ImageObj.Zapper2.Key, ImageObj.Zapper2.Path)
        this.load.image(ImageObj.Zapper3.Key, ImageObj.Zapper3.Path)
        this.load.image(ImageObj.Zapper4.Key, ImageObj.Zapper4.Path)
        this.load.image(ImageObj.Ground.Key, ImageObj.Ground.Path)

        // Loading Audio Asset
        this.load.audio(AudioObj.Launch.Key, AudioObj.Launch.Path)
        this.load.audio(AudioObj.Die.Key, AudioObj.Die.Path)
        this.load.audio(AudioObj.Fly.Key, AudioObj.Fly.Path)
        this.load.audio(AudioObj.Gameplay.Key, AudioObj.Gameplay.Path)
        this.load.audio(AudioObj.MainMenu.Key, AudioObj.MainMenu.Path)
    }

    create() {
        const logo = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'SunLogo')

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const scene = this

        this.tweens.add({
            targets: logo,
            alpha: 0,
            ease: 'Linear',
            duration: 1000,
            onComplete: function () {
                scene.scene.start(SceneKey.Menu)
            },
            onCompleteScope: this,
        })
    }
}
