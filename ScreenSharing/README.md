# Screen sharing sample

This sample application shows how to publish a screen sharing stream from the client using the OpenTok React Native SDK.

The app builds upon the Basic Video Chat sample app.

## Setup

1. Install the required node modules: `npm install`.

2. Install the required Gems: `bundle install`.

3. For iOS, install the Podfile's dependencies: `cd ios/ && bundle exec pod install`.

4. In the App.js file, set the `apiKey`, `sessionId`, and `token` properties to your Vonage Video API key (project ID), a Vonage Video session ID, and a token for that session.

Run the app:

* For Android: `npm run android`

* For iOS: `npm run ios`

For testing, you can use the [OpenTok playground](https://tokbox.com/developer/tools/playground/) to create sessions, publish streams to the session from a web client, and view the stream published from the client using the OpenTok React Native SDK.

## Understanding the code

The App.js file includes all of the code that uses the OpenTok React Native SDK.

The app uses a Boolean `shareScreen` state property to track whether to publish a screen-sharing stream or a camera (non-sharing stream). When the user clicks the "Toggle screen sharing" button, the state changes.

The `OTPublisher` component includes an `properties` object. The `videoSource` property of this object is set (based on the `shareScreen` state property). This determines whether the publisher publishes a screen-sharing or camera-based stream:

```js
  {this.state.shareScreen ? (
    <OTPublisher
      style={{width: 0, height: 0}}
      properties={{videoSource: 'screen'}}
    />
  ) : (
    <View>
      <OTPublisher
        style={{width: 200, height: 200}}
        properties={{videoSource: 'camera'}}
      />
    </View>
  )}
```

Because the screen-sharing stream publishes video that includes the entire content of the client View, the width and height of the `OTPublisher` and `OTSubscriber` (the `style.width` and `style.height` properties of those components) is set to 0 when publishing a screen-sharing stream. This way, other clients will not see their own video stream (or the React Native client's camera) included in the screen-sharing stream.
