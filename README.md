# COSC 325 Project by:

- Linus Drissel
- Casey Hardell
- Matthew Mckenzie
- Willy Njundong

## Overview

This repository is composed of a react native app, which will be used to steer a toy vehicle via bluetooth. The vehicle's traction will be managed by an arduino.

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

1. Install all necessary components

```bash
cd App
yarn
```

2. Then connect your device to your computer via USB. Permit access via any device prompts that may come up. On android make sure usb debugging is enabled.

3) Build and install the app to your device.

For an android device, run `yarn android --variant=release`

For ios, `yarn ios --variant=release`

## Try It Out

### Steering
