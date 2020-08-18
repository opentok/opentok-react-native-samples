# Multiparty Video

This sample application shows how to connect to an OpenTok session,
publish a stream, and subscribe to multiple streams for both iOS and
Android using the OpenTok React Native API.

## Configure

Before running the application, you need to configure it to use the API key
of your OpenTok project, along with an OpenTok session ID and token.
For development purposes, you can obtain a session ID and token by navigating
to your [TokBox account](https://tokbox.com/account/#/) page, selecting a
project, and scrolling to the bottom of the page where it says `Generate Token`.

Open the `src/App.js` file in your project and set the `this.apiKey`,
`this.sessionId`, and `this.token` values to the API key, session ID,
and token you obtained from your TokBox account:

```
// Set Credentials
this.apiKey = '';    // Add your API key.
this.sessionId = ''; // Add the session ID.
this.token = '';     // Add the token.
```

An OpenTok session connects different clients letting them share audio-video
streams and send messages. Clients in the same session can include iOS,
Android, and web browsers.

For testing, you can use a session ID and token generated at your TokBox
account page. However, the final application should obtain these values using
the OpenTok server SDKs. For more information, see the OpenTok
[server SDK guides](https://tokbox.com/developer/sdks/server/) on session
and token creation.

## Run

### Android

- Run `npm run android`.

***Note: If you're running the app on the simulator, you will see a simulation
for your publisher because the simulator doesn't have a camera.***

### iOS

- Run `npm run ios`.

***Note: If you're running the app on the simulator, you will see a simulation
for your publisher because the simulator doesn't have a camera.***