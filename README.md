# COSC 325 Project by:

- Linus Drissel
- Casey Hardell
- Matthew Mckenzie
- Willy Njundong

## Overview

This repository is composed of an react native app, which will be used to steer a toy/project/robotic car via bluetooth.

## Requirements

### Hardware

- The vehicle: `MODEL HERE`
- Aurduino Board: `MODEL HERE`
- Bluetooth receiver: `MODEL HERE`
- Android/iOS device equipped with the following sensors:
  - Accelerometer
  - Gyroscope
  - Magnetometer

### Software

- npm
  - React Native CLI installed and globally accessible
- yarn
- Android Studio and/or XCode

Then run `yarn android` or `yarn ios` depending on what OS you're running this on.
_Notice_: This has only been tested on Android so far

## Setup

### Hardware

```
Hardware steup info
```

### Software

```bash
cd App
yarn
```

Finally, connect your device to your computer via USB.
For an android device, run `yarn android --variant=release`
For ios, `yarn ios --variant=release`
This should build and install the app to your device.

## Try It Out

### Steering
