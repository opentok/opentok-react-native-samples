# Signaling sample

This sample application shows how to add use OpenTok [signaling](https://tokbox.com/developer/guides/signaling) to send and receive signals to clients connected to an OpenTok session.

The app builds upon the Basic Video Chat sample app.

## Setup

1. Install the required node modules: `npm install`.

2. Install the required Gems: `bundle install`.

3. For iOS, install the Podfile's dependencies: `cd ios/ && bundle exec pod install`.

4. In the App.js file, set the `apiKey`, `sessionId`, and `token` properties to your Vonage Video API key (project ID), a Vonage Video session ID, and a token for that session.

Run the app:

* For Android: `npm run android`

* For iOS: `npm run ios`

For testing, you can use the [OpenTok playground](https://tokbox.com/developer/tools/playground/) to create sessions, send signals, and view signals send by the client using the OpenTok React Native SDK.

## Understanding the code

The App.js file includes all of the code that uses the OpenTok React Native SDK.

The `this.sessionEventHandlers` property includes `signal` property. This is set to a function that is called when the client receives a signal for the session:

```js
this.sessionEventHandlers = {
  signal: event => {
    if (event.data) {
      const myConnectionId =
        this.session.getSessionInfo().connection.connectionId;
      const oldMessages = this.state.messages;
      const messages =
        event.connectionId === myConnectionId
          ? [...oldMessages, {data: `Me: ${event.data}`}]
          : [...oldMessages, {data: `Other: ${event.data}`}];
      this.setState({
        messages,
      });
    }
  },
};
```

The function compares the `connectionId` property of the `signal` event (which is the connection ID for the client sending the event) with the local client's connection ID. If they match, the signal was sent by the local client.

The app uses a `messages` state property to maintain an array of signaling messages to be displayed in the UI using a React Native `FlatList` component:

```jsx
<FlatList
  data={this.state.messages}
  renderItem={this._renderItem}
  keyExtractor={this._keyExtractor}
/>
```

The `OTSession` object dispatches the `session` events.The `eventHandlers` property of the `OTSession` object is set to the event handlers object:

```jsx
<OTSession
  apiKey={this.apiKey}
  sessionId={this.sessionId}
  token={this.token}
  eventHandlers={this.sessionEventHandlers}>
  
  {/* ... */}
</OTSession>
```

When the user clicks the "Send Signal" button, the `this.sendSignal()` method is called. It sets the `signal` property of the application state object:

```js
sendSignal() {
  if (this.state.text) {
    this.setState({
      signal: {
        type: '',
        data: this.state.text,
      },
      text: '',
    });
  }
}
```

The `signal` property of the `OTSession` component sends a signal when the value of `this.state.signal` property changes.

```jsx
<OTSession
  apiKey={this.apiKey}
  sessionId={this.sessionId}
  token={this.token}
  signal={this.state.signal}
  eventHandlers={this.sessionEventHandlers}
  ref={instance => {
    this.session = instance;
  }}
/>
```

You can also send a signal by setting a `ref` for the `OTSession` object and calling the `signal()` method of the object.

For more information, see the OpenTok [Signaling developer guide](https://tokbox.com/developer/guides/signaling).
