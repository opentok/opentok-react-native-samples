import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';

function App() {
  const apiKey = '';
  const sessionId = '';
  const token = '';
  const [isFabric, setIsFabric] = useState(!!global?.nativeFabricUIManager);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount(count + 1);
      setIsFabric(!!global?.nativeFabricUIManager);
    }, 1000);
  });

  return (
    <View
    style={styles.view}>
    <Text>New architecture: {isFabric.toString()} {count.toString()}</Text>
    <OTSession
      apiKey={apiKey}
      sessionId={sessionId}
      token={token}>
      <OTPublisher style={styles.pubSub}/>
      <OTSubscriber style={styles.pubSub} />
    </OTSession>
  </View>
  );
}

const styles = StyleSheet.create({
  pubSub: {
    width: 200, height: 200,
  },
  view: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 100,
    paddingVertical: 50,
  },
});

export default App;
