/* eslint-disable react-native/no-inline-styles */
import React, {Component, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {OTSession, OTPublisher, OTSubscriber} from '@vonage/client-sdk-video-react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {shareScreen: false};
    this.applicationId = '';
    this.sessionId = '';
    this.token = '';

    this.toggleScreenShare = () => {
      this.setState({shareScreen: !this.state.shareScreen});
    };
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          paddingHorizontal: 100,
          paddingVertical: 50,
        }}>
        <Text>Screen-sharing sample</Text>
        <OTSession
          applicationId={this.applicationId}
          sessionId={this.sessionId}
          token={this.token}
          eventHandlers={this.sessionEventHandlers}>
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
          <OTSubscriber
            style={
              this.state.shareScreen
                ? {width: 0, height: 0}
                : {width: 200, height: 200}
            }
          />
        </OTSession>
        <Button
          title="Toggle screen sharing"
          onPress={this.toggleScreenShare}
        />
      </View>
    );
  }
}

export default App;
