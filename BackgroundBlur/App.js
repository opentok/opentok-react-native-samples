/* eslint-disable react-native/no-inline-styles */
import React, {Component, createRef} from 'react';
import {View, Button} from 'react-native';
import {OTSession, OTPublisher, OTSubscriber} from '@vonage/client-sdk-video-react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.applicationId = '';
    this.sessionId = '';
    this.token = '';
    this.useBackgroundBlur = false;
    this.publisher = createRef();
    this.publsiherEventHandlers = {
      streamCreated: async (event: StreamCreatedEvent) => {
        this.toggleBackgroundBlur();
      },  
    };
    this.toggleBackgroundBlur = () => {
      if (this.publisher.current) {
        const blurFilter = {
          name: 'BackgroundBlur',
          properties: JSON.stringify({
            radius: 'High',
          }),
        };
        const filters = [];
        this.useBackgroundBlur = !this.useBackgroundBlur;
        if (this.useBackgroundBlur) {
          filters.push(blurFilter);
        }
        this.publisher.current.setVideoTransformers(filters);
      }
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
          applicationId={this.applicationId}
          sessionId={this.sessionId}
          token={this.token}>
          <OTPublisher
            ref={this.publisher}
            style={{width: 200, height: 200}}
            eventHandlers={this.publsiherEventHandlers}
          />
          <OTSubscriber style={{width: 200, height: 200}} />
        </OTSession>
        <Button title='Toggle background blur' onPress={this.toggleBackgroundBlur}/>
      </View>
    );
  }
}

export default App;
