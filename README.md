# OpenTok React Native Samples

<img src="https://assets.tokbox.com/img/vonage/Vonage_VideoAPI_black.svg" height="48px" alt="Tokbox is now known as Vonage" />

_These samples demonstrate how to use opentok-react-native to do video-calling
in a React Native application._

## Contents

- [Pre-Requisites](#pre-requisites)
- [Installation](#installation)
- [Contributing](#contributing)

### In this repo, you'll find:

- [Archiving](https://github.com/opentok/opentok-react-native-samples/tree/master/Archiving):

  This sample application shows how to display and hide an archiving indicator when archiving for the session starts and stops. Note that you start and stop archiving using the OpenTok REST API or the OpenTok server SDKs. See the OpenTok [Archiving](https://tokbox.com/developer/guides/archiving) developer guide.

- [BackgroundBlur](https://github.com/opentok/opentok-react-native-samples/tree/master/BackgroundBlur):

  This sample application shows how to use the Vonage Media Library to apply a background blur to a published video stream.

- [Basic Video Chat](https://github.com/opentok/opentok-react-native-samples/tree/master/BasicVideoChat):

  This sample application shows how to connect to an OpenTok session,
  publish a stream, and subscribe to multiple streams for both iOS and
  Android using the OpenTok React Native API.

- [Multiparty](https://github.com/opentok/opentok-react-native-samples/tree/master/Multiparty):

  This sample application shows how to arrange videos and to toggle the mic and camera in multiparty calls.

- [Signaling](https://github.com/opentok/opentok-react-native-samples/tree/master/Signaling):

  This sample application shows how to connect to an OpenTok session and implement OpenTok Signaling to create a text chat for both iOS and Android using the OpenTok React Native API.

- [ScreenSharing](https://github.com/opentok/opentok-react-native-samples/tree/master/Archiving):

  This sample application shows how to toggle between publishing a screen-sharing stream and a camera feed stream. Note that the screen-sharing stream shares the entire contents of the screen, so the local publisher and subscriber views are hidden (`{width: 0, height: 0}`) when publishing the screen-sharing stream (so they don't appear in the published stream).

For details on each sample, see the README.md file in each sample directory.

## Pre-Requisites

1. Install [node.js](https://nodejs.org/)

2. Install Watchman: `brew install watchman`

3. Install React Native CLI: `npm install -g react-native-cli`

4. Install and update [Xcode](https://developer.apple.com/xcode/) (you will need a Mac)

- React Native iOS installation [instructions](https://facebook.github.io/react-native/docs/getting-started.html)

5. Install and update [Android Studio](https://developer.android.com/studio/index.html)

- React Native Android installation [instructions](https://facebook.github.io/react-native/docs/getting-started.html)

## Setup

1. Clone this repo.

2. In your terminal, change your directory to the sample project you want:

- `cd Archiving/`
- `cd BackgroundBlur/`
- `cd BasicVideoChat/`
- `cd Multiparty/`
- `cd Signaling/`
- `cd ScreenSharing/`

3. Install the required node modules: `npm install`.

4. Install the required Gems: `bundle install`.

5. For iOS, install the Podfile's dependencies: `cd ios/ && bundle exec pod install`.

6. In the App.js file, set the `apiKey`, `sessionId`, and `token` properties to your Vonage Video API key (project ID), a Vonage Video session ID, and a token for that session.

## Development and Contributing

Interested in contributing? We :heart: pull requests! See the
[Contribution](CONTRIBUTING.md) guidelines.

## Getting Help

We love to hear from you so if you have questions, comments or find a bug in the project, let us know! You can either:

- Open an issue on this repository
- See <https://support.tokbox.com/> for support options
- Tweet at us! We're [@VonageDev](https://twitter.com/VonageDev) on Twitter
- Or [join the Vonage Developer Community Slack](https://developer.nexmo.com/community/slack)

## Further Reading

- Check out the Developer Documentation at <https://tokbox.com/developer/>
