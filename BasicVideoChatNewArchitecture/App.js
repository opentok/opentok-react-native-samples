/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View} from 'react-native';
import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.apiKey = "1cc1c8de-7e50-497b-b0b1-7d8e1ae46d38";
    this.sessionId = "1_MX4xY2MxYzhkZS03ZTUwLTQ5N2ItYjBiMS03ZDhlMWFlNDZkMzh-fjE3NzI0NjQ3MDYwODJ-SWx0UXlBUlpweVNVV0JOZ0pRTXVMbDN0fn5-";
    this.token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6InNlc3Npb24uY29ubmVjdCIsInNlc3Npb25faWQiOiIxX01YNHhZMk14WXpoa1pTMDNaVFV3TFRRNU4ySXRZakJpTVMwM1pEaGxNV0ZsTkRaa016aC1makUzTnpJME5qUTNNRFl3T0RKLVNXeDBVWGxCVWxwd2VWTlZWMEpPWjBwUlRYVk1iRE4wZm41LSIsInJvbGUiOiJtb2RlcmF0b3IiLCJpbml0aWFsX2xheW91dF9jbGFzc19saXN0IjoiIiwiZXhwIjoxNzcyNTUxMTA2LCJzdWIiOiJ2aWRlbyIsImFjbCI6eyJwYXRocyI6eyIvc2Vzc2lvbi8qKiI6e319fSwianRpIjoiZDgyNGNlYWYtMGFlMS00NmVmLWJhZWItMTQ5NDA0MWY0M2IzIiwiaWF0IjoxNzcyNDY0NzA2LCJhcHBsaWNhdGlvbl9pZCI6IjFjYzFjOGRlLTdlNTAtNDk3Yi1iMGIxLTdkOGUxYWU0NmQzOCJ9.FDD3_15V-I7aQq_-h1x_Y3LK3nqjTmNwFN3W-7a_na67P4vYGjbhDf_U6_UV34v8UhGCCuyFiM5WaW0blce7hIOTS5XGSC2qTjJMD9330-qchobK1msFdcOtTr1FseewI3iUtuqBJzdf4nol7hL5et_xgEDhN6VQD0VSa4bVXrYcmLhRsYTwpYHNi8kTpC9qx1RMNdsIRI2CPnRwQSK44a3Hf0SQ8f_V8sy5eQ5_4FVCiFV6ER-36v4_NUTb2b0nzbFu8-6O8BcgJfPOzdDcz_S-mRFrX00DPhFcdovNrOpTdUcyzQBb__T3xObTIBw3BWUpdJXoZAbxHQTPAuy1tg";
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
