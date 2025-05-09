# Basic Video Chat sample

This sample application shows how to connect to an OpenTok session, publish a stream, and subscribe to multiple streams for both iOS and Android using the OpenTok React Native SDK.

## Setup

1. Install the required node modules: `npm install`.

2. Install the required Gems: `bundle install`.

3. For iOS, install the Podfile's dependencies: `cd ios/ && bundle exec pod install`.

4. In the App.js file, set the `apiKey`, `sessionId`, and `token` properties to your Vonage Video API key (project ID), a Vonage Video session ID, and a token for that session.

Run the app:

* For Android: `npm run android`

* For iOS: `npm run ios`

For testing, you can use the [OpenTok playground](https://tokbox.com/developer/tools/playground/) to create sessions, publish streams from a web client, and subscribe to streams published from the client using the OpenTok React Native SDK.

## Understanding the code


This app is based on the BasicVideoChat sample application, with modifications to apply a background blur filter to a published video stream.

The background blur filter uses the Vonage Media Processor library. You need to explicitly add Vonage Media Library to the project.

For Android, see the app's build.gradle file, which includes the following in the `dependencies` section:

```
implementation 'com.vonage:client-sdk-video-transformers:2.28.0'
```

For iOS, the following is included in the Podfile:

```
pod 'VonageClientSDKVideoTransformers'
```

The App.js file sets a ref to the OTPublisher object:

```js
this.publisher = createRef();
```

And it includes a method that toggles setting the blur filter (or no filter) for the publisher:

```js
this.toggleBackgroundBlur = () => {
   if (this.publisher.current) {
      const blurFilter = {
         name: 'BackgroundBlur',
         properties: JSON.stringify({
         radius: 'High',
         }),
      };
      const filters = [];
      this.useBackgroundBlur = !this.useBackgroundBlur;
      if (this.useBackgroundBlur) {
         filters.push(blurFilter);
      }
      this.publisher.current.setVideoTransformers(filters);
   }
}
```

This `toggleBackgroundBlur()` calls the `setVideoTransformers()` method of the OTPublisher ref. To set the filter, an array of filter objects containing a single object defining the background blur filter is passed into the `setVideoTransformers()` method. To clear the filter, an empty array is passed into the method. This method is called when the `OTPublisher streamCreated()` event handler is called (when the published stream is created) and when the user clicks the *Toggle background blur* button in the user interface.

For more information on background blur filter and the Vonage Media Processor library, see [this documentation](https://tokbox.com/developer/guides/vonage-media-processor/).
