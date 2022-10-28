/* eslint-disable react-native/no-inline-styles */
import {OTPublisher, OTSession, OTSubscriber} from 'opentok-react-native';
import React, {Component} from 'react';
import {View} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.apiKey = '47551641';
    this.sessionId =
      '1_MX40NzU1MTY0MX5-MTY2NjA5NjgwNDc5NH5YVUVEZG4wWERGbW5ZUjZYQTFPdkpsdzl-UH4';
    this.token =
      'T1==cGFydG5lcl9pZD00NzU1MTY0MSZzaWc9NGViYzViYmM0NzA0OGQwNGIwYjgyODgxZjhiNDgwMTFhZTNmNjc3MTpzZXNzaW9uX2lkPTFfTVg0ME56VTFNVFkwTVg1LU1UWTJOakE1Tmpnd05EYzVOSDVZVlVWRVpHNHdXRVJHYlc1WlVqWllRVEZQZGtwc2R6bC1VSDQmY3JlYXRlX3RpbWU9MTY2NjA5Njg2MiZub25jZT0wLjYyNjc5NjczNTM5MjQ3NDQmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTY2NjE4MzI2MiZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==';
  }

  render() {
    return (
      this.token && (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            paddingHorizontal: 100,
            paddingVertical: 50,
          }}>
          <OTSession
            apiKey={this.apiKey}
            sessionId={this.sessionId}
            token={this.token}>
            <OTPublisher style={{width: 200, height: 200}} />
            <OTSubscriber style={{width: 200, height: 200}} />
          </OTSession>
        </View>
      )
    );
  }
}

export default App;
