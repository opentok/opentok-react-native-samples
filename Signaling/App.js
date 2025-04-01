import React, {Component} from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
} from 'react-native';
import {OTSession} from '@vonage/client-sdk-video-react-native';

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  mainText: {
    fontSize: 20,
    marginTop: 30,
    marginBottom: 10,
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.applicationId = '';
    this.sessionId = '';
    this.token = '';
    this.state = {
      signal: {
        data: '',
        type: '',
      },
      text: '',
      messages: [],
    };
    this.sessionEventHandlers = {
      signal: event => {
        if (event.data) {
          const myConnectionId =
            this.session.getSessionInfo().connection.connectionId;
          const oldMessages = this.state.messages;
          const messages =
            event.connectionId === myConnectionId
              ? [...oldMessages, {data: `Me: ${event.data}`}]
              : [...oldMessages, {data: `Other: ${event.data}`}];
          this.setState({
            messages,
          });
        }
      },
    };
  }
  sendSignal() {
    if (this.state.text) {
      this.setState({
        signal: {
          type: '',
          data: this.state.text,
        },
        text: '',
      });
    }
  }
  _keyExtractor = (item, index) => index;
  _renderItem = ({item}) => <Text style={styles.item}>{item.data}</Text>;
  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={styles.mainText}>
          {' '}
          OpenTok React Native Signaling Sample
        </Text>
        <OTSession
          applicationId={this.applicationId}
          sessionId={this.sessionId}
          token={this.token}
          signal={this.state.signal}
          eventHandlers={this.sessionEventHandlers}
          ref={instance => {
            this.session = instance;
          }}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={text => {
            this.setState({text});
          }}
          value={this.state.text}
        />
        <Button
          onPress={() => {
            this.sendSignal();
          }}
          title="Send Signal"
        />
        <FlatList
          data={this.state.messages}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }
}

export default App;
