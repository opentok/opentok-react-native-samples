/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View} from 'react-native';
import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.apiKey = '472032';
    this.sessionId =
      '2_MX40NzIwMzJ-fjE3MjM3NzExODA1ODJ-UE55c3gvQm5Wc2FSTnRTV1ZpQnNNWEZGfn5-';
    this.token =
      'T1==cGFydG5lcl9pZD00NzIwMzImc2lnPThhYzA0YzE3MDNiYzhiZDYxM2JlOTkyYzNmM2IyYWMwNzc5MGZjMzc6c2Vzc2lvbl9pZD0yX01YNDBOekl3TXpKLWZqRTNNak0zTnpFeE9EQTFPREotVUU1NWMzZ3ZRbTVXYzJGU1RuUlRWMVpwUW5OTldFWkdmbjUtJmNyZWF0ZV90aW1lPTE3MjM3NzExODEmbm9uY2U9MC45NTYwMDQyMDM0MjI2MzI0JnJvbGU9bW9kZXJhdG9yJmV4cGlyZV90aW1lPTE3MjYzNjMxODEmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=';
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
          apiKey={this.apiKey}
          sessionId={this.sessionId}
          token={this.token}>
          <OTPublisher style={{width: 200, height: 200}} />
          <OTSubscriber style={{width: 200, height: 200}} />
        </OTSession>
      </View>
    );
  }
}

export default App;
