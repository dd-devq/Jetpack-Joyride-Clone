import { AudioObj } from '../constant/Audio'
import { SceneKey } from '../constant/SceneKey'

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
        this.load.image('SunLogo', 'assets\\Logo.png')
        this.load.image('GameLogo', 'assets\\sprites\\Logo.png')
        this.load.image('Background', 'assets\\sprites\\BackdropMain.png')
        this.load.image('Bullet', 'assets\\sprites\\Bullet.png')
        this.load.image('BulletCollision', 'assets\\sprites\\BulletCollision.png')
        this.load.image('ButtonBack', 'assets\\sprites\\ButtonBack.png')
        this.load.image('ButtonBuy', 'assets\\sprites\\ButtonBuy.png')
        this.load.image('ButtonCreadits', 'assets\\sprites\\ButtonCredits.png')
        this.load.image('ButtonMusicOff', 'assets\\sprites\\ButtonMusicOff.png')
        this.load.image('ButtonMusicOn', 'assets\\sprites\\ButtonMusicOn.png')
        this.load.image('ButtonPlayAgain', 'assets\\sprites\\ButtonPlayAgain.png')
        this.load.image('ButtonPlayGame', 'assets\\sprites\\ButtonPlayGame.png')
        this.load.image('ButtonQuit', 'assets\\sprites\\ButtonQuit.png')
        this.load.image('ButtonSelect', 'assets\\sprites\\ButtonSelect.png')
        this.load.image('ButtonShop', 'assets\\sprites\\ButtonShop.png')
        this.load.image('ButtonShopDeadScreen', 'assets\\sprites\\ButtonShopDeathScreen.png')
        this.load.image('ButtonSoundOff', 'assets\\sprites\\ButtonSoundOff.png')
        this.load.image('ButtonSoundOn', 'assets\\sprites\\ButtonSoundOn.png')
        this.load.image('Coin', 'assets\\sprites\\Coin.png')
        this.load.image('FlyFire', 'assets\\sprites\\FlyFire.png')
        this.load.image('FlyFire2', 'assets\\sprites\\FlyFire2.png')
        this.load.image('icon', 'assets\\sprites\\icon.png')
        this.load.image('logoGlow', 'assets\\sprites\\logoGlow.png')
        this.load.image('LogoSmall', 'assets\\sprites\\LogoSmall.png')
        this.load.image('Menu', 'assets\\sprites\\Menu.png')
        this.load.image('PlayerDead', 'assets\\sprites\\PlayerDead.png')
        this.load.image('PlayerFly', 'assets\\sprites\\PlayerFly.png')
        this.load.image('Rocket', 'assets\\sprites\\Rocket.png')
        this.load.image('RocketWarning', 'assets\\sprites\\RocketWarning.png')
        this.load.image('SoundOff', 'assets\\sprites\\SoundOff.png')
        this.load.image('SoundOn', 'assets\\sprites\\SoundOn.png')
        this.load.image('SplashArt', 'assets\\sprites\\SplashArt.png')
        this.load.image('Zapper1', 'assets\\sprites\\Zapper1.png')
        this.load.image('Zapper2', 'assets\\sprites\\Zapper2.png')
        this.load.image('Zapper3', 'assets\\sprites\\Zapper3.png')
        this.load.image('Zapper4', 'assets\\sprites\\Zapper4.png')

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
                scene.scene.start(SceneKey.Menu, { isMute: false })
            },
            onCompleteScope: this,
        })
    }
}
