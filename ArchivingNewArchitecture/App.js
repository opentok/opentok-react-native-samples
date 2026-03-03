import React, {Component, useState} from 'react';
import {View, Text} from 'react-native';
import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {showRecIndicator: false};
    this.apiKey = "1cc1c8de-7e50-497b-b0b1-7d8e1ae46d38";
    this.sessionId = "1_MX4xY2MxYzhkZS03ZTUwLTQ5N2ItYjBiMS03ZDhlMWFlNDZkMzh-fjE3NzIxMTQ1OTM0MzN-TWgvYlpBQzJEUVNZdVJjdER1UUpYWHVNfn5-";
    this.token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6InNlc3Npb24uY29ubmVjdCIsInNlc3Npb25faWQiOiIxX01YNHhZMk14WXpoa1pTMDNaVFV3TFRRNU4ySXRZakJpTVMwM1pEaGxNV0ZsTkRaa016aC1makUzTnpJeE1UUTFPVE0wTXpOLVRXZ3ZZbHBCUXpKRVVWTlpkVkpqZEVSMVVVcFlXSFZOZm41LSIsInJvbGUiOiJtb2RlcmF0b3IiLCJpbml0aWFsX2xheW91dF9jbGFzc19saXN0IjoiIiwiZXhwIjoxNzcyMjAwOTkzLCJzdWIiOiJ2aWRlbyIsImFjbCI6eyJwYXRocyI6eyIvc2Vzc2lvbi8qKiI6e319fSwianRpIjoiMDI4N2FjZGItNzgxYi00N2NiLWE2ODQtODUzMTFhMjE0MTc3IiwiaWF0IjoxNzcyMTE0NTkzLCJhcHBsaWNhdGlvbl9pZCI6IjFjYzFjOGRlLTdlNTAtNDk3Yi1iMGIxLTdkOGUxYWU0NmQzOCJ9.aypLBCmL4KKsvsHzYxpwscWRtmnqL_kCZ0RljZ-Bpmj3t4h-9kRxeMnwvRYwWWWMX9XJvACZNUXcIRO0Y9f9zFy665V0oxORp9K4Cq4w0egyXUpKjz-r_B0vvbI6IM9bkuY0AgArWNKNsddyru5Qkkj4CgSbHWFMuQw6H0TZfMa0Zz7vmrrh1u-Mf1u-CkuB4CcJlqQfGbB7G-qYO5xkR8I87T1yAJM-A9KPcO-FO73W14d-o8AobCnCP_HBeHZP7MOsnRRiAlJj_xSoqQN05p5qxcpeVErJ_HwnVyPykPjf7AbPJxIrypaGM5OvTk6BpG__0sg9U1kJ9v87LxJ8zg";
 
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
          apiKey={this.apiKey}
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
