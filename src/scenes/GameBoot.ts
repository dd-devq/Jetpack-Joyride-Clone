import { sceneKey } from '../constant/SceneKey'
import { ImageObj } from '../constant/Images'
import { AudioObj } from '../constant/Audio'

import { PlayerObj } from '../constant/Player'
import { DepthLayer } from '../constant/Animations'
export class GameBoot extends Phaser.Scene {
    preload() {
        this.load.image('splash', 'assets\\Splash\\loading_screen.png')
    }

    create() {
        if (!localStorage.getItem('coins')) {
            localStorage.setItem('coins', '0')
        }
        // Create the splash screen image
        const splashImage = this.add.image(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            'splash'
        )

        // Optionally, scale the splash image to fit the screen
        splashImage.setScale(
            this.cameras.main.width / splashImage.width,
            this.cameras.main.height / splashImage.height
        )

        const barWidth = 750
        const barHeight = 20

        const progressBar = this.add.graphics()
        const progressBox = this.add.graphics()

        progressBox.fillStyle(0x000000, 1)
        progressBox.fillRect(
            (window.innerWidth - barWidth) / 2,
            (window.innerHeight - barHeight) / 1.15,
            barWidth,
            barHeight
        )

        this.load.on('progress', (value: number) => {
            progressBar.clear()
            progressBar.fillStyle(0xf7f7f7, 1)
            progressBar
                .fillRect(
                    (window.innerWidth - barWidth) / 2,
                    (window.innerHeight - barHeight) / 1.15,
                    barWidth * value,
                    barHeight
                )
                .setDepth(DepthLayer.UI)
        })

        this.load.on('complete', () => {
            progressBar.destroy()
            progressBox.destroy()
            this.scene.start(sceneKey.MENU)
        })

        this.loadAsset()

        this.load.start()
    }

    loadAsset() {
        // Loading Image Asset
        this.load.spritesheet(PlayerObj.Head.Key, PlayerObj.Head.Path, {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.spritesheet(PlayerObj.Body.Key, PlayerObj.Body.Path, {
            frameWidth: 32,
            frameHeight: 32,
        })

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
}
