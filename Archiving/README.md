# Archiving sample

This sample application shows how to add a UI element to indicate when a session is being archived.

The app builds upon the Basic Video Chat sample app.

## Setup

1. Install the required node modules: `npm install`

2. For iOS, install the Podfile's dependencies: `cd ios/ && pod install`

3. In the App.js file, set the `apiKey`, `sessionId`, and `token` properties to your Vonage Video API key (project ID), a Vonage Video session ID, and a token for that session.

You will need to start and stop archiving using one of the OpenTok server SDKs or the OpenTok REST API. See the [OpenTok Archiving developer guide](https://tokbox.com/developer/guides/archiving).

For testing, you can use the [OpenTok playground](https://tokbox.com/developer/tools/playground/) to create sessions and start and stop archiving.

## Understanding the code

The App.js file includes all of the code that uses the OpenTok React Native SDK.

The `this.sessionEventHandlers` property includes `archiveStarted` and `archiveStopped` properties. These are set to functions that are called when the archive starts and stops for the session.

```js
this.sessionEventHandlers = {
  archiveStarted: event => {
    this.setState({showRecIndicator: true});
    console.log('Archive started -- archive ID:', event.archiveId);
  },
  archiveStopped: event => {
    this.setState({showRecIndicator: false});
    console.log('Archive stoped -- archive ID:', event.archiveId);
  },
};
```

The app uses a `showRecIndicator` state property to track whether to show the "Recording" indicator in the publisher (based on whether the session is being archived).

The `OTSession` object dispatches the `archiveStarted` and `archiveStopped` events.The `eventHandlers` property of the `OTSession` object is set to the event handlers object:

```jsx
<OTSession
  apiKey={this.apiKey}
  sessionId={this.sessionId}
  token={this.token}
  eventHandlers={this.sessionEventHandlers}>
  
  {/* ... */}
</OTSession>
```

If the `showRecIndicator` property of the state (see above) is set, a React Native `Text` component is added as a child of the `OTPublisher` component:

```jsx
<OTPublisher style={{width: 200, height: 200}}>
  {this.state.showRecIndicator ? (
    <Text
      style={{
        color: 'red',
        zIndex: 1,
        padding: 4,
        bottom: 0,
        position: 'absolute',
      }}>
      • REC
    </Text>
  ) : null}
</OTPublisher>
```

For more information, see the [OpenTok Archiving developer guide](https://tokbox.com/developer/guides/archiving).
