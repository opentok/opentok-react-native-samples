/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.apiKey = '472032';
    this.sessionId =
      '1_MX40NzIwMzJ-fjE3MTA4ODU0ODAzNzJ-Uy9jMmtzS3VMWTRPNmlSTmhoZFFZby9Jfn5-';
    this.token =
      'T1==cGFydG5lcl9pZD00NzIwMzImc2lnPTIxY2M5MGMyNTVmZDcyMmY2N2ZjMzM3ZWM0NTdlYzUxOGM4Zjc1ZjQ6c2Vzc2lvbl9pZD0xX01YNDBOekl3TXpKLWZqRTNNVEE0T0RVME9EQXpOekotVXk5ak1tdHpTM1ZNV1RSUE5tbFNUbWhvWkZGWmJ5OUpmbjUtJmNyZWF0ZV90aW1lPTE3MTA4ODU0ODAmbm9uY2U9MC42ODgzNDM4MDg2OTYwNDAzJnJvbGU9bW9kZXJhdG9yJmV4cGlyZV90aW1lPTE3MTM0Nzc0ODAmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=';
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
        <Text>Test fix-screenshare-no-camera-permission</Text>
        <OTSession
          apiKey={this.apiKey}
          sessionId={this.sessionId}
          token={this.token}>
          <OTPublisher
            style={{width: 0, height: 0}}
            properties={{ videoSource: 'screen' }}
          />
          <OTSubscriber style={{width: 200, height: 200}} />
        </OTSession>
      </View>
    );
  }
}

export default App;
