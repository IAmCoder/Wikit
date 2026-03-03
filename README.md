# Wikit

App for WikiTribune Social 2.0, a community-led and community-moderated platform dedicated to creating a space where discussions can thrive.

## Download

[<img alt="Get it on Google Play" width="281" height="84" src="./assets/google-play.png" />](https://play.google.com/store/apps/details?id=com.lucidcode.wikit)

[<img alt="Get it on Google Play" width="283" height="84" src="./assets/app-store.png" />](https://apps.apple.com/us/app/wikit-social/id6758104901)

## Debug

`yarn install`

`npx expo start`

`eas build --profile development --platform android`

## Screenshots

<p align="center">
    <img alt="Login Screen" height="400" src="./screenshots/login.jpg" />
    <img alt="Login Screen" height="400" src="./screenshots/technology.jpg" />
    <img alt="Login Screen" height="400" src="./screenshots/profile.jpg" />
    <img alt="Login Screen" height="400" src="./screenshots/settings.jpg" />
</p>

## Local build

`sudo ./sdkmanager --install "cmake;3.22.1"`

`export ANDROID_HOME="/usr/lib/android-sdk"`

`eas build --platform android --local`

`eas build --profile development --platform android --local`

## Prod Build

`eas build -p android`

`eas build -p ios`

`eas submit --platform ios`

`eas build --profile production --platform android`
