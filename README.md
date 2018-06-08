# OpenTok React Native Samples

![OpenTok Labs](https://d26dzxoao6i3hh.cloudfront.net/items/0U1R0a0e2g1E361H0x3c/Image%202017-11-22%20at%2012.16.38%20PM.png?v=2507a2df)

## Contents

- [Pre-Requisites](#pre-requisites)
- [Installation](#installation)
- [Contributing](#contributing)

### In this repo, you'll find:
 * [Basic Video Chat](https://github.com/opentok/opentok-react-native-samples/tree/master/BasicVideoChat):
    * This sample application shows how to connect to an OpenTok session, publish a stream, and subscribe to multiple streams for both iOS and Android using the OpenTok React Native API.
 * [Signaling](https://github.com/opentok/opentok-react-native-samples/tree/master/Signaling):
    * This sample application shows how to connect to an OpenTok session and implement OpenTok Signaling to create a text chat for both iOS and Android using the OpenTok React Native API.

## Pre-Requisites

1. Install [node.js](https://nodejs.org/)

2. Install Watchman: `brew install watchman`

3. Install React Native CLI: `npm install -g react-native-cli`

4. Install and update [Xcode](https://developer.apple.com/xcode/) (you will need a Mac)
* React Native iOS installation [instructions](https://facebook.github.io/react-native/docs/getting-started.html)

5. Install and update [Android Studio](https://developer.android.com/studio/index.html)
* React Native Android installation [instructions](https://facebook.github.io/react-native/docs/getting-started.html)

## Installation

To install this package in your project, run the following command:

```
npm install opentok-react-native --save
react-native link opentok-react-native
```

### For iOS:

* `cd ios`
* `pod install`

2. For Android:

* `react-native link opentok-react-native`
*  Add the following to your project's `build.gradle` file:

```
maven {
    url "http://tokbox.bintray.com/maven"
}
```

## Contributing

If you make changes to the project that you would like to contribute back
then please follow the [contributing guidelines](CONTRIBUTING.md).
All contributions are greatly appreciated!
