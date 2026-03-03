import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
  Button,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  OTSession,
  OTPublisher,
  OTSubscriber,
  OTSubscriberView,
} from 'opentok-react-native';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const mainSubscribersResolution = {width: 1280, height: 720};
const secondarySubscribersResolution = {width: 352, height: 288};

class App extends Component {
  constructor(props) {
    super(props);
   this.apiKey = '';
    this.sessionId = '';
    this.token = '';
  
    this.state = {
      subscriberIds: [],
      localPublishAudio: true,
      localPublishVideo: true,
      joinCall: false,
      streamProperties: {},
      mainSubscriberStreamId: null,
    };

    this.sessionEventHandlers = {
      streamCreated: event => {
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
      streamDestroyed: event => {
        const indexToRemove = this.state.subscriberIds.indexOf(event.streamId);
        const newSubscriberIds = this.state.subscriberIds;
        const streamProperties = {...this.state.streamProperties};
        if (indexToRemove !== -1) {
          delete streamProperties[event.streamId];
          newSubscriberIds.splice(indexToRemove, 1);
          this.setState({subscriberIds: newSubscriberIds});
        }
      },
      error: error => {
        console.log('Session error:', error);
      },
      otrnError: error => {
        console.log('Session otrnError error:', error);
      },
      sessionDisconnected: () => {
        this.setState({
          streamProperties: {},
          subscriberIds: [],
        });
      },
    };

    this.publisherProperties = {};
  }

  toggleAudio = () => {
    let publishAudio = this.state.localPublishAudio;
    this.publisherProperties = {
      ...this.publisherProperties,
      publishAudio: !publishAudio,
    };
    this.setState({
      localPublishAudio: !publishAudio,
    });
  };

  toggleVideo = () => {
    let publishVideo = this.state.localPublishVideo;
    this.publisherProperties = {
      ...this.publisherProperties,
      publishVideo: !publishVideo,
    };
    this.setState({
      localPublishVideo: !publishVideo,
    });
  };

  joinCall = () => {
    const {joinCall} = this.state;
    if (!joinCall) {
      this.setState({joinCall: true});
    }
  };

  endCall = () => {
    const {joinCall} = this.state;
    if (joinCall) {
      this.setState({joinCall: !joinCall});
    }
  };

  handleSubscriberSelection = (subscribers, streamId) => {
    let subscriberToSwap = subscribers.indexOf(streamId);
    let currentSubscribers = subscribers;
    let temp = currentSubscribers[subscriberToSwap];
    currentSubscribers[subscriberToSwap] = currentSubscribers[0];
    currentSubscribers[0] = temp;
    this.setState(prevState => {
      const newStreamProps = {...prevState.streamProperties};
      for (let i = 0; i < currentSubscribers.length; i += 1) {
        if (i === 0) {
          newStreamProps[currentSubscribers[i]] = {
            ...prevState.streamProperties[currentSubscribers[i]],
          };
          newStreamProps[currentSubscribers[i]].preferredResolution =
            mainSubscribersResolution;
        } else {
          newStreamProps[currentSubscribers[i]] = {
            ...prevState.streamProperties[currentSubscribers[i]],
          };
          newStreamProps[currentSubscribers[i]].preferredResolution =
            secondarySubscribersResolution;
        }
      }
      return {
        mainSubscriberStreamId: streamId,
        streamProperties: newStreamProps,
      };
    });
  };

  handleScrollEnd = (event, subscribers) => {
    let firstVisibleIndex;
    if (
      event &&
      event.nativeEvent &&
      !isNaN(event.nativeEvent.contentOffset.x)
    ) {
      firstVisibleIndex = parseInt(
        event.nativeEvent.contentOffset.x / (dimensions.width / 2),
        10,
      );
    }
    this.setState(prevState => {
      const newStreamProps = {...prevState.streamProperties};
      if (firstVisibleIndex !== undefined && !isNaN(firstVisibleIndex)) {
        for (let i = 0; i < subscribers.length; i += 1) {
          if (i === firstVisibleIndex || i === firstVisibleIndex + 1) {
            newStreamProps[subscribers[i]] = {
              ...prevState.streamProperties[subscribers[i]],
            };
            newStreamProps[subscribers[i]].subscribeToVideo = true;
          } else {
            newStreamProps[subscribers[i]] = {
              ...prevState.streamProperties[subscribers[i]],
            };
            newStreamProps[subscribers[i]].subscribeToVideo = false;
          }
        }
      }
      return {streamProperties: newStreamProps};
    });
  };

  renderSubscribers = subscribers => {
    if (this.state.mainSubscriberStreamId) {
      subscribers = subscribers.filter(
        sub => sub !== this.state.mainSubscriberStreamId,
      );
      subscribers.unshift(this.state.mainSubscriberStreamId);
    }
    
    // For v2.31.1: return array of wrapper Views with streamId prop
    // OTSubscriber will wrap each in Context.Provider
    return subscribers.map((streamId, index) => {
      const isMainSubscriber = subscribers.length > 1 && index === 0;
      const isSecondarySubscriber = subscribers.length > 1 && index > 0;
      
      return (
        <View
          key={streamId}
          streamId={streamId}
          style={{
            position: 'absolute',
            ...(isMainSubscriber && {
              top: 0,
              left: 0,
              width: dimensions.width,
              height: (dimensions.height * 3) / 4 - 50,
            }),
            ...(isSecondarySubscriber && {
              bottom: 50,
              left: (index - 1) * (dimensions.width / 2),
              width: dimensions.width / 2,
              height: dimensions.height / 4,
            }),
            ...((subscribers.length === 1) && {
              top: 0,
              left: 0,
              width: dimensions.width,
              height: dimensions.height - 50,
            }),
          }}>
          <TouchableOpacity
            style={{width: '100%', height: '100%'}}
            onPress={() => this.handleSubscriberSelection(subscribers, streamId)}>
            <OTSubscriberView
              streamId={streamId}
              style={{width: '100%', height: '100%'}}
            />
          </TouchableOpacity>
        </View>
      );
    });
  };

  videoView = () => {
    return (
      <>
        <View style={styles.fullView}>
          <OTSession
            apiKey={this.apiKey}
            sessionId={this.sessionId}
            token={this.token}
            options={{
              ...(Platform.OS === 'android' && {androidOnTop: 'publisher'}),
            }}
            eventHandlers={this.sessionEventHandlers}>
            <OTPublisher
              properties={this.publisherProperties}
              style={styles.publisherStyle}
            />
            <OTSubscriber
              style={{height: dimensions.height, width: dimensions.width}}
              streamProperties={this.state.streamProperties}>
              {this.renderSubscribers}
            </OTSubscriber>
          </OTSession>
        </View>

        <View style={styles.buttonWrapperView}>
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
      </>
    );
  };

  joinVideoCall = () => {
    return (
      <View style={styles.fullView}>
        <Button onPress={this.joinCall} title="Join call" />
      </View>
    );
  };

  render() {
    return this.state.joinCall ? this.videoView() : this.joinVideoCall();
  }
}

const styles = StyleSheet.create({
  buttonWrapperView: {
    height: 50,
    display: 'flex',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  fullView: {
    padding: 15,
     marginTop: 10,
    flex: 1,
  },
  publisherStyle: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 5,
  },
  mainSubscriberStyle: {
    height: (dimensions.height * 3) / 4 - 50,
  },
  secondarySubscribers: {
    height: dimensions.height / 4,
  },
});

export default App;
