/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.apiKey = '472032';
    this.sessionId = '1_MX40NzIwMzJ-fjE3MTA4MDU2NTk2NTJ-UldzaHBEOEo3QkxxaFl0Q253RDJvb25Gfn5-';
    this.token = 'T1==cGFydG5lcl9pZD00NzIwMzImc2lnPTZlMGUyMDEyYjY4NmI3MWI2ZTg5MWNlYjQ2NzYxYjkyNzUyMzM3YmY6c2Vzc2lvbl9pZD0xX01YNDBOekl3TXpKLWZqRTNNVEE0TURVMk5UazJOVEotVWxkemFIQkVPRW8zUWt4eGFGbDBRMjUzUkRKdmIyNUdmbjUtJmNyZWF0ZV90aW1lPTE3MTA4MDU2NjAmbm9uY2U9MC44MjcyMTM0Mzg2ODkwNDg4JnJvbGU9bW9kZXJhdG9yJmV4cGlyZV90aW1lPTE3MTMzOTc2NjAmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=';
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
