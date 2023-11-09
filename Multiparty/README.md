# Multiparty sample

This sample application shows how to add UI elements to arrange videos and to toggle the mic and camera in multiparty calls using OpenTok React Native SDK.

The app builds upon the Basic Video Chat sample app.

## Setup

1. Install the required node modules: `npm install`

2. For iOS, install the Podfile's dependencies: `cd ios/ && pod install`

3. In the App.js file, set the `apiKey`, `sessionId`, and `token` properties to your Vonage Video API key (project ID), a Vonage Video session ID, and a token for that session.

For testing, you can use the [OpenTok playground](https://tokbox.com/developer/tools/playground/) to create sessions, publish streams to the session from a web client, and view the stream published from the client using the OpenTok React Native SDK. Open the playground in multiple tabs to publish multiple streams to the session (from the browser). And mute the computer's speaker to prevent audio feedback

## Understanding the code

The App.js file includes all of the code that uses the OpenTok React Native SDK.

### Joining the call

The App component will be our landing view when our App is launched. It will have a primary conditional render function to start the video call.

The `joinCall` property on the React state will trigger different views based on the value. When the App is launched, a simple View with a "Join the Call" button will be displayed to the user. The button will trigger a state change and toggle the `joinCall` value to show the more complex Video Call View.

## The video chat interface

Now that we’ve built a framework for our project, we’ll build the interface for the app itself. We’ll refer to this interface as the Video Call View.

The code will listen to events fired by the `OTSession`, `OTPublisher` and `OTSubscriber` components, especially the session events, such as `sessionConnected`, `sessionDisconnected`, `streamCreated`, and `streamDestroyed` (Documentation: [Session Events](https://github.com/opentok/opentok-react-native/blob/develop/docs/OTSession.md#events)).

The Video Call View is composed of the following components:

* Publisher. The publisher view displays the primary user’s video stream.

* Subscribers. The subscriber views display the video streams of other participants.

* Toolbar. The toolbar contains buttons for microphone access, camera access, and ending the call.

### Adding the Participant Streams

Next, we’ll add video streams from chat participants (the subscribers and the publisher).

To add video streams to the interface, we need to keep track of the subscribers' streams, the primary subscriber, and the local microphone and camera publishing state. The perfect place to store this information is the React State.

```jsx
constructor(props) {
  super(props);
  this.apiKey = credentials.API_KEY;
  this.sessionId = credentials.SESSION_ID;
  this.token = credentials.TOKEN;
  this.state = {
    subscriberIds: [], // Array for storing subscribers
    localPublishAudio: true, // Local Audio state
    localPublishVideo: true, // Local Video state
    joinCall: false, // State variable used to start the call
    streamProperties: {}, // Handle individual stream properties,
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

The `subscriberIds` array stores the subscribers within a session. Each time we receive a `streamCreated` event, it means that someone has joined the session and published a stream, so we need to add their streamId on the `subscriberIds` array.

On the other hand, when we receive the `streamDestroyed` event, we need to remove the streamId from the subscribers' array.

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

On the video view render function, we need to add `OTSession`, `OTPublisher` and `OTSubscriber` from the opentok-react-native library. On the `OTSession` we set the credentials and the `eventHandler` function as props of the component.

### Build the Video Call Toolbar

Now that the video streams are working, we’ll enable the features on our video call toolbar.

The `OTPublisher` component will initialize a publisher and publish to the specified session upon mounting. It's possible to specify different properties, such as camera position, resolution, and others (Publisher options list: Publisher Options). In this example App, we will only set `this.publisherProperties = { cameraPosition: 'front'}`;.

Ensure you have enabled both camera and microphone usage by adding the following entries to your Info.plist file (iOS Project):

```xml
<key>NSCameraUsageDescription</key>
<string>Your message to user when the camera is accessed for the first time</string>
<key>NSMicrophoneUsageDescription</key>
<string>Your message to user when the microphone is accessed for the first time</string>
```

Alternatively, for Android, add the following (newer versions of Android–API Level 23 (Android 6.0)–have a different permissions model that is already handled by this library):

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-feature android:name="android.hardware.camera" android:required="true" />
<uses-feature android:name="android.hardware.camera.autofocus" android:required="false" />
<uses-feature android:name="android.hardware.microphone" android:required="true" />
```

The `OTPublisher` component also has a `streamProperty` property which handles the publisher properties passed into the native instance. Using the React State, we can trigger changes to the Publisher instance by updating the `this.publisherProperties` variable. We use this approach to implement the Toolbar with the mute/unmute functions for the Microphone and Camera. The function implementation is straightforward; it toggles the `publishAudio` or `publishVideo` value on the `this.publisherProperties` and the `localPublishAudio` and `localPublishVideo` to adjust the button icon based on the value.

The End Call button has a very similar approach. The `endCall` function toggles the `joinCall` value on the State and resets the View to the initial one.

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
  <Icon.Button
    style={styles.iconStyle}
    backgroundColor="#131415"
    name={this.state.localPublishAudio ? 'mic' : 'mic-off'}
    onPress={this.toggleAudio}
  />
  <Icon.Button
    style={styles.iconStyle}
    backgroundColor="#131415"
    name="call-end"
    onPress={this.endCall}
  />
  <Icon.Button
    style={styles.iconStyle}
    backgroundColor="#131415"
    name={this.state.localPublishVideo ? 'videocam' : 'videocam-off'}
    onPress={this.toggleVideo}
  />
</View>
```

### Optimize the App for Multiple Streams

If you have reached this point, we have implemented the Join Call View, the Session and Publisher component, and the Toolbar.

Next, we will define the View for the different possible number of subscribers. After that, we’ll add features to help optimize video performance in our React Native app.

If we have *no users*, we are going to display a simple informative text.

If we have only *one subscriber*, we will display their stream in full-screen mode.

Finally, if we have *more than one user*, we will show the primary subscriber in the big View (as shown in the mock-up), and the other in a Scroll View component to handle a different number of subscribers.

As the number could grow and challenge our device CPU and network bandwidth, we will implement optimizations on each of the subscribers, such as lowering the resolution and disabling the video for the subscribers that are not visible.

Let's explore the `OTSubscriber` component to handle the cases described above. First of all, as we want to have control over each subscriber, we would need to implement a render function for the subscribers (see [custom rendering of streams](https://github.com/opentok/opentok-react-native/blob/master/docs/OTSubscriber.md#custom-rendering-of-streams).

```jsx
renderSubscribers = (subscribers) => {
  if (this.state.mainSubscriberStreamId) {
    subscribers = subscribers.filter(sub => sub !== this.state.mainSubscriberStreamId);
    subscribers.unshift(this.state.mainSubscriberStreamId);
  }
  return subscribers.length > 1 ? (
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
  ) : subscribers.length > 0 ? (
    <TouchableOpacity style={styles.fullView}>
      <OTSubscriberView streamId={subscribers[0]}
        key={subscribers[0]}
        style={{ width: '100%', height: '100%' }}
      />
    </TouchableOpacity>
  ) : (<Text>No one connected</Text>)
};  
```

We use the conditional rendering in React (https://reactjs.org/docs/conditional-rendering.html) to handle the different cases with zero, one or N subscribers.

Firstly, if there are not subscribers, we fall into the last case, and we display a `Text` component.

Secondly, if there is one subscriber, we display the subscriber in a full view mode.

Lastly, the most interesting case is when the subscribers are more than one: We have a main subscriber view and a `ScrollView` component in which we will feed the other subscribers. The first step is to check if we have a `mainSubscriberStreamId`. If so, we will sort the array to have the primary subscriber as the first element. The remaining subscribers will be displayed in the `ScrollView` horizontally. The `ScrollView` component is ideal for our use case, as we can show a relatively high number of subscribers without the need to change the layout, and we can detect how many subscribers are in the scroll view and how many of them are *visible*.

Group calls on mobile devices could be very challenging, both from the hardware and network point of view. To deliver a good result to the end-user, an App should implement a list of best practices to handle different use cases and layout. In our case, we have a main subscriber view which needs to have the best resolution possible, and the Scroll View component with the remaining subscribers in smaller thumbnails that could be optimized by lowering the received resolution. Opentok SDKs give the developer the opportunity to set the preferred resolution and frame rate for each of the subscriber ([setPreferredFrameRate](https://tokbox.com/developer/sdks/js/reference/Subscriber.html#setPreferredFrameRate) and [setPreferredResolution](https://tokbox.com/developer/sdks/js/reference/Subscriber.html#setPreferredResolution)).

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

Based on the subscriber selected, the function moves the selected subscriber to the head of the subscribers' array. As mentioned before, the first element on the subscriber array will be displayed in the main View. After that, we need to update the `streamProperties` of the `OTSubscriber` component to set the different preferred resolution. We set the maximum resolution (`width: 1280, height: 720`) for the primary subscriber and a lower resolution for the others (`{ width: 352, height: 288 }`). If we also want to change the preferred frame rate, based on the layout or use case, we would only need to add the `preferredFrameRate` property on the `streamProperties` object.

Finally, we want to optimize the `ScrollView` component. The `ScrollView` component could have a high number of subscribers, but can only show two simultaneously. For example, if we have five subscribers, one will be on the main subscriber view; the remaining four will be on the `ScrollView`. Only two of them are visible in the View, and the remaining ones will be visible only if we scroll horizontally.

The ScrollView component has an event listener called [onScrollEndDrag](https://reactnative.dev/docs/scrollview#onscrollenddrag), which is called when the user stops dragging the scroll view and it either stops or begins to glide. We can use this event to understand which subscribers are visible and mute the video of the remaining ones. Muting the video of the non-visible stream will improve the performance of the App, and save CPU consumption and network bandwidth.

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

On the `onScrollEndDrag` event, we have the information about the contentOffset coordinates, which is the point at which the origin of the content view is offset from the origin of the scroll view. We will use this value to understand which streams are currently visible, dividing the content offset by half of the width of the screen (`event.nativeEvent.contentOffset.x / (dimensions.width / 2)`).

The result will be the first visible subscriber. At this point, we know that the visible streams are the stream in position `firstVisibleIndex` and `firstVisibleIndex + 1`. The last step is to loop the subscribers' array and mute the video of the non-visible subscribers.
