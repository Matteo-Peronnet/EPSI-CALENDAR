
# EPSI CALENDAR

This application replace the current EPSI schedule.

## DEMO
![](./doc/demo.gif)


## INSTALLATION

```
npm install
react-native run-ios
```

## BUILD ANDROID

```
keytool -genkey -v -keystore epsi-calendar.keystore -alias epsi-calendar -keyalg RSA -keysize 2048 -validity 10000

cd android && ./gradlew assembleRelease && cd ..

jarsigner -verbose -keystore ./epsi-calendar.keystore android/app/build/outputs/apk/app-release-unsigned.apk epsi-calendar

zipalign -f -v 4 android/app/build/outputs/apk/app-release-unsigned.apk appName.apk
```

## BUILD IOS

```
react-native run-ios --configuration Release
```

Then, you have to go to Xcode to configure your app to be built using the Release scheme, go to Product → Scheme → Edit Scheme. Select the Run tab in the sidebar, then set the Build Configuration dropdown to Release.

Then you must replace inside your `AppDelegate.m`

```
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
```

by

```
  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
```
