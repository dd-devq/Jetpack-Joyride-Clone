import { sceneKey } from '../constant/SceneKey'
import { ImageObj } from '../constant/Images'
import { AudioObj } from '../constant/Audio'

import { PlayerObj } from '../constant/Player'
import { DepthLayer } from '../constant/Animations'
import { coinPattern } from '../constant/CoinPattern'
export class GameBoot extends Phaser.Scene {
    preload() {
        this.load.image('splash', 'assets\\Splash\\loading_screen.png')
    }

    create() {
        if (!localStorage.getItem('coins')) {
            localStorage.setItem('coins', '0')
        }

        if (!localStorage.getItem('skin')) {
            localStorage.setItem('skin', ImageObj.PlayerFly.Key)
        }

        // if (!localStorage.getItem('playerData')) {
        const playerData = {
            default: {
                key: ImageObj.PlayerFly.Key,
                isUnlocked: true,
                isUsed: true,
                price: 200,
            },
            green: {
                key: ImageObj.playerGreen.key,
                isUnlocked: false,
                isUsed: false,
                price: 200,
            },
            pink: {
                key: ImageObj.playerPink.key,
                isUnlocked: false,
                isUsed: false,
                price: 200,
            },
            red: {
                key: ImageObj.playerRed.key,
                isUnlocked: false,
                isUsed: false,
                price: 200,
            },
            orange: {
                key: ImageObj.playerOrange.key,
                isUnlocked: false,
                isUsed: false,
                price: 200,
            },
            yellow: {
                key: ImageObj.playerYellow.key,
                isUnlocked: false,
                isUsed: false,
                price: 200,
            },
            perry: {
                key: ImageObj.playerPerry.key,
                isUnlocked: false,
                isUsed: false,
                price: 200,
            },
        }
        localStorage.setItem('playerData', JSON.stringify(playerData, null))

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

        this.load.image(ImageObj.playerGreen.key, ImageObj.playerGreen.path)
        this.load.image(ImageObj.playerOrange.key, ImageObj.playerOrange.path)
        this.load.image(ImageObj.playerPerry.key, ImageObj.playerPerry.path)
        this.load.image(ImageObj.playerPink.key, ImageObj.playerPink.path)
        this.load.image(ImageObj.playerRed.key, ImageObj.playerRed.path)
        this.load.image(ImageObj.playerYellow.key, ImageObj.playerYellow.path)

        // Loading Audio Asset
        this.load.audio(AudioObj.Launch.Key, AudioObj.Launch.Path)
        this.load.audio(AudioObj.Die.Key, AudioObj.Die.Path)
        this.load.audio(AudioObj.Fly.Key, AudioObj.Fly.Path)
        this.load.audio(AudioObj.Gameplay.Key, AudioObj.Gameplay.Path)
        this.load.audio(AudioObj.MainMenu.Key, AudioObj.MainMenu.Path)

        // Loading Coin Pattern
        this.load.text(coinPattern.PATTERN1.key, coinPattern.PATTERN1.path)
        this.load.text(coinPattern.PATTERN2.key, coinPattern.PATTERN2.path)
        this.load.text(coinPattern.PATTERN3.key, coinPattern.PATTERN3.path)
        this.load.text(coinPattern.PATTERN4.key, coinPattern.PATTERN4.path)
        this.load.text(coinPattern.PATTERN5.key, coinPattern.PATTERN5.path)
        this.load.text(coinPattern.PATTERN6.key, coinPattern.PATTERN6.path)
        this.load.text(coinPattern.PATTERN7.key, coinPattern.PATTERN7.path)
        this.load.text(coinPattern.PATTERN8.key, coinPattern.PATTERN8.path)
        this.load.text(coinPattern.PATTERN9.key, coinPattern.PATTERN9.path)
        this.load.text(coinPattern.PATTERN10.key, coinPattern.PATTERN10.path)
        this.load.text(coinPattern.PATTERN11.key, coinPattern.PATTERN11.path)
        this.load.text(coinPattern.PATTERN12.key, coinPattern.PATTERN12.path)
        this.load.text(coinPattern.PATTERN13.key, coinPattern.PATTERN13.path)
        this.load.text(coinPattern.PATTERN14.key, coinPattern.PATTERN14.path)
        this.load.text(coinPattern.PATTERN15.key, coinPattern.PATTERN15.path)
        this.load.text(coinPattern.PATTERN16.key, coinPattern.PATTERN16.path)
        this.load.text(coinPattern.PATTERN17.key, coinPattern.PATTERN17.path)
        this.load.text(coinPattern.PATTERN18.key, coinPattern.PATTERN18.path)
        this.load.text(coinPattern.PATTERN19.key, coinPattern.PATTERN19.path)
        this.load.text(coinPattern.PATTERN20.key, coinPattern.PATTERN20.path)
        this.load.text(coinPattern.PATTERN21.key, coinPattern.PATTERN21.path)
        this.load.text(coinPattern.PATTERN22.key, coinPattern.PATTERN22.path)
        this.load.text(coinPattern.PATTERN23.key, coinPattern.PATTERN23.path)
        this.load.text(coinPattern.PATTERN24.key, coinPattern.PATTERN24.path)
        this.load.text(coinPattern.PATTERN25.key, coinPattern.PATTERN25.path)
        this.load.text(coinPattern.PATTERN26.key, coinPattern.PATTERN26.path)
        this.load.text(coinPattern.PATTERN27.key, coinPattern.PATTERN27.path)
    }
}
