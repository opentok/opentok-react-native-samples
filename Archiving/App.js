/* eslint-disable react-native/no-inline-styles */
import React, {Component, useState} from 'react';
import {View, Text} from 'react-native';
import {OTSession, OTPublisher, OTSubscriber} from '@vonage/client-sdk-video-react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {showRecIndicator: false};
    this.applicationId = '';
    this.sessionId = '';
    this.token = '';

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
        <OTSession
          applicationId={this.applicationId}
          sessionId={this.sessionId}
          token={this.token}
          eventHandlers={this.sessionEventHandlers}>
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
          <OTSubscriber style={{width: 200, height: 200}} />
        </OTSession>
      </View>
    );
  }
}

export default App;
