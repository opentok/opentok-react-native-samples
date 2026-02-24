/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View} from 'react-native';
import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.apiKey = '45328772';
    this.sessionId = '2_MX40NTMyODc3Mn5-MTc3MDk5MTA4ODc2OX5mYlIwTmpicU5leS96OXFpM29pYlhvMDd-fn4';
    this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI0NTMyODc3MiIsImlzdCI6InByb2plY3QiLCJpYXQiOjE3NzA5OTExMTcsImV4cCI6MTc3MDk5MjkxNjc0NSwic2Vzc2lvbl9pZCI6IjJfTVg0ME5UTXlPRGMzTW41LU1UYzNNRGs1TVRBNE9EYzJPWDVtWWxJd1RtcGljVTVsZVM5Nk9YRnBNMjlwWWxodk1EZC1mbjQiLCJjcmVhdGVfdGltZSI6MTc3MDk5MTExNywibm9uY2UiOjAuMjg2ODA4NDAyMzgzOTMyOCwicm9sZSI6Im1vZGVyYXRvciIsImV4cGlyZV90aW1lIjoxNzcwOTkyOTE2NzQ1LCJpbml0aWFsX2xheW91dF9jbGFzc19saXN0IjoiIiwic2NvcGUiOiJzZXNzaW9uLmNvbm5lY3QifQ.5dli63uYelgVJ-NxKE7uDBh4WYJBB25Lb0UOkDVWPc8';
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


// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import { NewAppScreen } from '@react-native/new-app-screen';
// import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
// import {
//   SafeAreaProvider,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';

// function App() {
//   const isDarkMode = useColorScheme() === 'dark';

//   return (
//     <SafeAreaProvider>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <AppContent />
//     </SafeAreaProvider>
//   );
// }

// function AppContent() {
//   const safeAreaInsets = useSafeAreaInsets();

//   return (
//     <View style={styles.container}>
//       <NewAppScreen
//         templateFileName="App.tsx"
//         safeAreaInsets={safeAreaInsets}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default App;
