### Setup Instructions

1. Install all necessary components

```bash
yarn
```

2. Then connect your device to your computer via USB. Permit access via any device prompts that may come up. On android make sure usb debugging is enabled.

3. Build and install the app to your device.

- android: `yarn android --variant=release`
- ios: `yarn ios --variant=release`

Notes:

Steering clockwise/counterclockwise:

- Use gyro (rads/s) z value

Traction

- Magnetometer (uT) z value. 0 means phone is flat (screen/back facing down to earth).
