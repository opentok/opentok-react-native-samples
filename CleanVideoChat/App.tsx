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
  '2_MX40NzU1MTY0MX5-MTY2NzIwMTExNTIxMX5pSTZROFFNTHRlN25MWWhXZUV5azhwTjN-UH4';
const token =
  'T1==cGFydG5lcl9pZD00NzU1MTY0MSZzaWc9MjNlNjkzZTc0MzkwYmYyMGZmZjcyOWRjNmE2M2QxNTAwYTU3YmJlYjpzZXNzaW9uX2lkPTJfTVg0ME56VTFNVFkwTVg1LU1UWTJOekl3TVRFeE5USXhNWDVwU1RaUk9GRk5USFJsTjI1TVdXaFhaVVY1YXpod1RqTi1VSDQmY3JlYXRlX3RpbWU9MTY2NzIwMTEyMyZub25jZT0wLjEwMTE2NzEyMDEzOTU4MjA3JnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE2NjcyODc1MjMmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=';

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
