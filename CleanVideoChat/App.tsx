/**
 * Sample Vonage VideoChat
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template (version 0.70.4)
 * https://github.com/react-native-community/react-native-template-typescript
 *
 */
import {OTPublisher, OTSession, OTSubscriber} from 'opentok-react-native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const apiKey = '47551641';
const sessionId =
  '2_MX40NzU1MTY0MX5-MTY2NzMxMTI4MjI3Nn5BcXRobVVTUndjU0xRVXZSc2hCRWdwb29-UH4';
const token =
  'T1==cGFydG5lcl9pZD00NzU1MTY0MSZzaWc9MjE4OTBiMTAxMDc3MWM1Y2U5MDhlZThlOGNhMTMwMzAzNTQ0MjhkMDpzZXNzaW9uX2lkPTJfTVg0ME56VTFNVFkwTVg1LU1UWTJOek14TVRJNE1qSTNObjVCY1hSb2JWVlRVbmRqVTB4UlZYWlNjMmhDUldkd2IyOS1VSDQmY3JlYXRlX3RpbWU9MTY2NzMxMTI5MCZub25jZT0wLjIxNzY5Nzc0ODgxODQzMzk2JnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE2NjczOTc2OTAmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=';

const App = () => {
  return (
    <View style={styles.screen}>
      <Text>CleanVideoChat</Text>
      {
        <OTSession apiKey={apiKey} sessionId={sessionId} token={token}>
          <OTPublisher style={styles.videoContainer} />
          <OTSubscriber style={styles.videoContainer} />
        </OTSession>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    width: 200,
    height: 200,
  },
  screen: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 100,
    paddingVertical: 50,
    backgroundColor: 'white',
    borderColor: 'green',
    borderWidth: 2,
  },
});

export default App;
