# Basic Video Chat sample

This version tests a bug fixed in the `edits-for-vonage-version` branch of the `opentok-react-native` project at github: https://github.com/opentok/opentok-react-native/tree/edits-for-vonage-version.

To test this:

1. Remove all installed packages and re-install:

   ```rm -rf node_modules; npm install```

2. Install the iOS Pods:

   ```npx pod-install```

  Note that the @vonage/client-sdk-video-react-native package uses different versions of the Vonage Video client SDKs than are used by the opentok-react-native package.

3. Open the Vonage Video Playground tool at the Vonage developer center (and log in with your developer credentials): https://tools.vonage.com/video/playground/.

4. Run the app on Android and iOS:

   ```npx react-native run-android```
   ```npx react-native run-is```
