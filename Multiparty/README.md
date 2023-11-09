# Multiparty sample

This sample application shows how to arrange videos and to toggle the mic and camera in multiparty calls using OpenTok React Native SDK.

The app builds upon the Basic Video Chat sample app.

## Setup

1. Install the required node modules: `npm install`

2. For iOS, install the Podfile's dependencies: `cd ios/ && pod install`

3. In the App.js file, set the `apiKey`, `sessionId`, and `token` properties to your Vonage Video API key (project ID), a Vonage Video session ID, and a token for that session.

For testing, you can use the [OpenTok playground](https://tokbox.com/developer/tools/playground/) to create sessions, publish streams to the session from a web client, and view the stream published from the client using the OpenTok React Native SDK. Open the playground in multiple tabs to publish multiple streams to the session (from the browser). And mute the computer's speaker to prevent audio feedback

## Understanding the code

The App.js file includes all of the code that uses the OpenTok React Native SDK.

### Joining the call

The App component is the landing view when our App is launched. It has a primary conditional `render()` function to start the video call.

The `joinCall` property of the React state triggers different views. When the App is launched, a simple View with a "Join the Call" button is displayed. The button triggers a state change and toggles the `joinCall` value to show the more complex video call view.

## The video chat interface

The app includes event handlers for events dispatched by the `OTSession` object, such as the `sessionConnected`, `sessionDisconnected`, `streamCreated`, and `streamDestroyed` events. (See the docs for these events: [Session Events](https://github.com/opentok/opentok-react-native/blob/develop/docs/OTSession.md#events)).

The video call view is composed of the following components:

* Publisher. The publisher view displays the primary user’s video stream.

* Subscribers. The subscriber views display the video streams of other participants.

* Toolbar. The toolbar contains buttons for microphone access, camera access, and ending the call.

### Adding the publisher and subscriber stream views

To add video streams to the interface, the React State keeps track of the subscribers' streams, the primary subscriber, and the local microphone and camera publishing state:

```jsx
constructor(props) {
  super(props);
  this.apiKey = credentials.API_KEY;
  this.sessionId = credentials.SESSION_ID;
  this.token = credentials.TOKEN;
  this.state = {
    subscriberIds: [],
    localPublishAudio: true,
    localPublishVideo: true,
    joinCall: false,
    streamProperties: {},
    mainSubscriberStreamId: null
  }; 
}
  
this.sessionEventHandlers = {
  streamCreated: (event) => {
    const streamProperties = {
      ...this.state.streamProperties,
      [event.streamId]: {
        subscribeToAudio: true,
        subscribeToVideo: true,
      },
    };
    this.setState({
      streamProperties,
      subscriberIds: [...this.state.subscriberIds, event.streamId],
    });
  },
  streamDestroyed: (event) => {
    const indexToRemove = this.state.subscriberIds.indexOf(event.streamId);
    const newSubscriberIds = this.state.subscriberIds;
    const streamProperties = { ...this.state.streamProperties };
    if (indexToRemove !== -1) {
      delete streamProperties[event.streamId];
      newSubscriberIds.splice(indexToRemove, 1);
      this.setState({ subscriberIds: newSubscriberIds });
    }
  }
}
```

The `subscriberIds` array stores the subscriber IDs for subscribers in the session. The `OTSession` object dispatches a `streamCreated` is dispatched when another client has published a stream, and the app adds the stream ID from that event to the `subscriberIds` array.

On the other hand, when the `OTSession` object dispatches a `streamDestroyed` event, the app removes the stream ID from the `subscriberIds` array.

```jsx
<View style={styles.fullView}>
  <OTSession
    apiKey={this.apiKey}
    sessionId={this.sessionId}
    token={this.token}
    eventHandlers={this.sessionEventHandlers}>
    <OTPublisher
      properties={this.publisherProperties}
      eventHandlers={this.publisherEventHandlers}
      style={styles.publisherStyle}
    />
    <OTSubscriber style={{ height: dimensions.height, width: dimensions.width }}
      eventHandlers={this.subscriberEventHandlers}
      streamProperties={this.state.streamProperties}
    >
      {this.renderSubscribers}
    </OTSubscriber>
  </OTSession>
</View>
```

The `videoView()` function (called by the `render()` function) adds the `OTSession`, `OTPublisher` and `OTSubscriber` components to the main view. The `OTSession` includes the credentials and the `eventHandler` function as props of the component.

### Building the toolbar

The `this.publisherProperties` is passed in as the `properties` property of the `OTPublisher` component. Initially, the `publisherProperties` object has no properties set -- the app publishes with the default settings (such as publishing both audio and video).

Using the React State, the app triggers changes to the Publisher instance by updating the `this.publisherProperties` variable. We use this approach to implement the tool with the mute/unmute functions for the microphone and camera. The function implementation is straightforward; it toggles the `publishAudio` or `publishVideo` value of the `this.publisherProperties` object and the `localPublishAudio` and `localPublishVideo` state properties to adjust the button icon based on the value.

The "End Call" button has a very similar approach. The `endCall` function toggles the `joinCall` value of the state and resets the View to the initial one.

```jsx
toggleAudio = () => {
    let publishAudio = this.state.localPublishAudio;
    this.publisherProperties = { ...this.publisherProperties, publishAudio: !publishAudio };
    this.setState({
      localPublishAudio: !publishAudio,
    });
  };

  toggleVideo = () => {
    let publishVideo = this.state.localPublishVideo;
    this.publisherProperties = { ...this.publisherProperties, publishVideo: !publishVideo };
    this.setState({
      localPublishVideo: !publishVideo,
    });
  };
  
 endCall = () => {
    const { joinCall } = this.state;
    if (joinCall) {
      this.setState({ joinCall: !joinCall });
    }
  };

<View style={styles.buttonView}>
  <Button
    title={
      this.state.localPublishAudio ? 'Turn mic off' : 'Turn mic on'
    }
    onPress={this.toggleAudio}
  />
  <Button title="End call" onPress={this.endCall} />
  <Button
    title={
      this.state.localPublishVideo
        ? 'Turn camera off'
        : 'Turn camera on'
    }
    onPress={this.toggleVideo}
  />
</View>
```

### Optimizing for multiple streams

If there are *no streams*, the app displays a simple informative text.

If there is only *one subscriber*, the app displays their stream in full-screen mode.

Finally, there are *more than one user*, the app shows the primary subscriber in the big View and the others in a `ScrollView` component to handle multiple subscribers.

Since the number of subscribers could grow and challenge the device CPU and network bandwidth, the app implements optimizations on each of the subscribers, such as lowering the resolution and disabling the video for the subscribers that are not visible.

To have control over each subscriber, the app implements a render function for the subscribers (see [custom rendering of streams](https://github.com/opentok/opentok-react-native/blob/master/docs/OTSubscriber.md#custom-rendering-of-streams).


The app uses React's conditional rendering (https://reactjs.org/docs/conditional-rendering.html) to handle the different cases with zero, one or N subscribers.

When there are more than one subscriber, the `renderSubscribers()` adds
a main subscriber view and a `ScrollView` component in which it feeds the other subscribers. The first step is to check if we have a `mainSubscriberStreamId`. If so, the app sorts the array to have the primary subscriber as the first element. The remaining subscribers will be displayed in the `ScrollView` horizontally. The `ScrollView` component is ideal for our use case, as we can show a relatively high number of subscribers without the need to change the layout, and we can detect how many subscribers are in the scroll view and how many of them are *visible*.

```jsx
<>
  <View style={styles.mainSubscriberStyle}>
    <TouchableOpacity
      onPress={() => this.handleSubscriberSelection(subscribers, subscribers[0])}
      key={subscribers[0]}>
      <OTSubscriberView
        streamId={subscribers[0]}
        style={{
          width: '100%', height: '100%'
        }}
      />
    </TouchableOpacity>
  </View>

  <View style={styles.secondarySubscribers}>
    <ScrollView
      horizontal={true}
      decelerationRate={0}
      snapToInterval={dimensions.width / 2}
      snapToAlignment={'center'}
      onScrollEndDrag={(e) => this.handleScrollEnd(e, subscribers.slice(1))}
      style={{
        width: dimensions.width,
        height: dimensions.height / 4,
      }}>
      {subscribers.slice(1).map((streamId) => (
        <TouchableOpacity
          onPress={() => this.handleSubscriberSelection(subscribers, streamId)}
          style={{
            width: dimensions.width / 2,
            height: dimensions.height / 4,
          }}
          key={streamId}
        >
          <OTSubscriberView
            style={{
              width: '100%', height: '100%'
            }}
            key={streamId}
            streamId={streamId}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
</>
```

Group calls on mobile devices could be very challenging, both from the hardware and network point of view. To deliver a good result to the end-user, an App should implement a list of best practices to handle different use cases and layout. In our case, we have a main subscriber view which needs to have the best resolution possible, and the `ScrollView` component with the remaining subscribers in smaller thumbnails that could be optimized by lowering the received resolution. The app sets the preferred resolution for each subscriber using the `preferredResolution` property of the `streamProperties` propety of the `OTSubscriber` objects. 

We implement the `handleSubscriberSelection` method to handle the mainSubscriber View and the preferred resolution. The function is on the `TouchableOpacity` component parent of each of the subscribers.

```jsx
const mainSubscribersResolution = { width: 1280, height: 720 };
const secondarySubscribersResolution = { width: 352, height: 288 };


handleSubscriberSelection = (subscribers, streamId) => {
  let subscriberToSwap = subscribers.indexOf(streamId);
  let currentSubscribers = subscribers;
  let temp = currentSubscribers[subscriberToSwap];
  currentSubscribers[subscriberToSwap] = currentSubscribers[0];
  currentSubscribers[0] = temp;
  this.setState(prevState => {
    const newStreamProps = { ...prevState.streamProperties };
    for (let i = 0; i < currentSubscribers.length; i += 1) {
      if (i === 0) {
        newStreamProps[currentSubscribers[i]] = { ...prevState.streamProperties[currentSubscribers[i]] }
        newStreamProps[currentSubscribers[i]].preferredResolution = mainSubscribersResolution;
      } else {
        newStreamProps[currentSubscribers[i]] = { ...prevState.streamProperties[currentSubscribers[i]] }
        newStreamProps[currentSubscribers[i]].preferredResolution = secondarySubscribersResolution;
      }
    }
    return { mainSubscriberStreamId: streamId, streamProperties: newStreamProps };
  })
}
```

Based on the subscriber selected, the function moves the selected subscriber to the head of the `subscribers` array. As mentioned before, the first element on the `subscribers` array will be displayed in the main View. After that, the app updates the `streamProperties` of the `OTSubscriber` component to set the different preferred resolution. We set the maximum resolution (`width: 1280, height: 720`) for the primary subscriber and a lower resolution for the others (`{ width: 352, height: 288 }`). If we also want to change the preferred frame rate, based on the layout or use case, we would add the `preferredFrameRate` property of the `streamProperties` object.

Finally, we want to optimize the `ScrollView` component. The `ScrollView` component could have a high number of subscribers, but can only show two simultaneously. For example, if we have five subscribers, one will be on the main subscriber view; the remaining four will be on the `ScrollView`. Only two of them are visible in the View, and the remaining ones will be visible only when the user scrolls the `ScrollView` component.

The `ScrollView` component has an event listener called [onScrollEndDrag](https://reactnative.dev/docs/scrollview#onscrollenddrag), which is called when the user stops dragging the scroll view and it either stops or begins to glide. We can use this event to understand which subscribers are visible and mute the video of the remaining ones. Muting the video of the non-visible stream will improve the performance of the App, and save CPU consumption and network bandwidth.

```jsx
handleScrollEnd = (event, subscribers) => {
  let firstVisibleIndex;
  if (event && event.nativeEvent && !isNaN(event.nativeEvent.contentOffset.x)) {
    firstVisibleIndex = parseInt(event.nativeEvent.contentOffset.x / (dimensions.width / 2), 10);
  }
  this.setState(prevState => {
    const newStreamProps = { ...prevState.streamProperties };
    if (firstVisibleIndex !== undefined && !isNaN(firstVisibleIndex)) {
      for (let i = 0; i < subscribers.length; i += 1) {
        if (i === firstVisibleIndex || i === (firstVisibleIndex + 1)) {
          newStreamProps[subscribers[i]] = { ...prevState.streamProperties[subscribers[i]] }
          newStreamProps[subscribers[i]].subscribeToVideo = true;
        } else {
          newStreamProps[subscribers[i]] = { ...prevState.streamProperties[subscribers[i]] }
          newStreamProps[subscribers[i]].subscribeToVideo = false;
        }
      }
    }
    return { streamProperties: newStreamProps }
  })
}
```

The `onScrollEndDrag` event object includes the `contentOffset` coordinates, which is the point at which the origin of the content view is offset from the origin of the scroll view. The app uses this value to understand which streams are currently visible, dividing the content offset by half of the width of the screen (`event.nativeEvent.contentOffset.x / (dimensions.width / 2)`).

The result is the first visible subscriber. At this point, the visible streams are in position `firstVisibleIndex` and `firstVisibleIndex + 1`. The last step is to loop the subscribers' array and mute the video of the non-visible subscribers.
