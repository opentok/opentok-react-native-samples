import React, { Component } from 'react';
import { Text, SafeAreaView, View } from 'react-native';
import { OTSession, OTPublisher, OTSubscriber, OT } from 'opentok-react-native';
import { VideoStats } from './networkTestHelper/VideoStats';
import { AudioStats } from './networkTestHelper/AudioStats';
import { CHECK_VIDEO_QUALITY_AUDIO_VIDEO } from './networkTestHelper/constants';

const config = require('./config.json')

export default class App extends Component {
    constructor( props ) {
        super( props );
        this.apiKey = config.apiKey;
        this.sessionId = config.sessionId;
        this.token = config.token;
        this.sessionEventHandlers = {
            sessionConnected: ( event ) => {
                console.log( 'sessionConnected', event )
                this.setState( { connection: 'Connected' } )
            },
            sessionDisconnected: () => {
                console.log( 'sessionDisconnected' )
                this.setState( { connection: 'Disconnected' } )
            },
            sessionDestroyed: () => {
                console.log( 'sessionDestroyed' )
                this.setState( { connection: 'Destroyed' } )
            },
            sessionReconnected: () => {
                console.log( 'sessionReconnected' )
                this.setState( { connection: 'Reconnected' } )
            },
            sessionReconnecting: () => {
                console.log( 'sessionReconnecting' )
                this.setState( { connection: 'Reconnecting' } )
            },
            error: error => {
                // error: {message: "Invalid session id format", code: 1004}
                console.log( 'Session error:', error );
                this.setState( { error } )
            },
            otrnError: event => {
                console.log( 'otRN error:', event );
            },
            streamCreated: stream => {
                console.log( '[sessionEventHandlers] - Stream created!', stream );
            },

        }
        this.publisherEventHandlers = {
            streamCreated: stream => {
                console.log( '[publisherEventHandlers]', stream );
                this.setState( { publisher: 'Publisher stream created' } )
                this.handleStreamCreatedEvent( stream );
            },
            streamDestroyed: event => {
                console.log( 'Publisher stream destroyed!', event );
                this.setState( { publisher: 'Publisher stream destroyed' } )
            },
            otrnError: event => {
                console.log( 'otRN Publisher error:', event );
            }
        };

        this.subscriberEventHandlers = {
            audioNetworkStats: ( obj ) => {
                // Test starts after 20 seconds, if it's still connected it means the video quality was not good enough (only audio)
                // and we want to chech if there is enough bandwidth for audio
                this.AudioStatsHandler.init( obj.audioStats ).then( ( result ) => {
                    this._sessionComponent.disconnectSession();
                    this.setState( { audioQualityTest: JSON.stringify( result ) } )
                } )
            },
            videoNetworkStats: ( obj ) => {
                this.VideoStatsHandler.init( obj.videoStats ).then( ( testResult ) => {
                    this.setState( { videoQualityTest: JSON.stringify( testResult ) } )
                    if ( testResult.result === CHECK_VIDEO_QUALITY_AUDIO_VIDEO ) {
                        // Disconnect session, no need for audio test
                        this._sessionComponent.disconnectSession();
                        this.setState( { skipTestAudio: true, audioQualityTest: 'Skipped' } );
                    }
                } )
            },
            connected: () => {
                console.log( '[subscriberEventHandlers - connected]' );
                if ( this.audioOnly ) {
                    this.setState( {
                        subscriber: 'Connected', audioQualityTest: 'Running....',
                        videoQualityTest: 'Skipped'
                    } )
                } else {
                    this.setState( {
                        subscriber: 'Connected', audioQualityTest: 'Running....',
                        videoQualityTest: 'Running....'
                    } )
                }

            },
            disconnected: () => {
                console.log( '[subscriberEventHandlers - disconnected]' );
                this.setState( { subscriber: 'Disconnected' } )
            },
            error: error => {
                console.log( 'subscriberEventHandlers error:', error );
                this.setState( { showSubscribeError: true, subscriberError: error } )
            },
        }

        this.state = {
            error: null,
            connection: 'Connecting',
            publisher: 'Stream not published',
            subscriber: 'Stream not subscribed',
            showPublishError: false,
            publishError: null,
            showSubscribeError: false,
            subscriberError: null,
            startTestTime: 0,
            audioQualityTest: null,
            videoQualityTest: null,
            skipTestAudio: false
        }
        // if you want to run the test only audio, set the flag to true
        this.audioOnly = false;
        this.AudioStatsHandler = null;
        this.VideoStatsHandler = null;
    }

    /**
     * This function subscribe the App to his own stream.
     * It also initiates the audioStats and videoStats helpers
     * @param {*} stream 
     */
    handleStreamCreatedEvent ( stream ) {
        this.AudioStatsHandler = new AudioStats();
        this.VideoStatsHandler = new VideoStats( this.audioOnly );
        this._subscriberComponent.streamCreatedHandler( stream, {
            subscribeToAudio: true,
            subscribeToVideo: true
        } );
    }

    render () {
        const { audioQualityTest, connection, error, publisher, publishError, showPublishError, showSubscribeError, subscriber,
            subscriberError, videoQualityTest } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <OTSession apiKey={this.apiKey} sessionId={this.sessionId} token={this.token}
                            eventHandlers={this.sessionEventHandlers} ref={component => this._sessionComponent = component}>
                            <OTPublisher style={{ width: '100%', height: 300 }} eventHandlers={this.publisherEventHandlers} />
                            <OTSubscriber ref={component => this._subscriberComponent = component}
                                eventHandlers={this.subscriberEventHandlers} subscribeToSelf={true} />
                        </OTSession>
                    </View>
                    <View style={{ alignItems: 'center', fontSize: 30 }}>
                        <Text>OpenTok Network Test</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text>Connection state: {connection}</Text>
                        <Text>Error: {JSON.stringify( error )}</Text>
                        {showPublishError ? <Text>Publisher: {JSON.stringify( publishError )}</Text> : <Text>Publisher: {publisher}</Text>}
                        {showSubscribeError ? <Text>Subscriber: {JSON.stringify( subscriberError )}</Text> : <Text>Subscriber: {subscriber}</Text>}
                        <Text>Video Quality Test: {videoQualityTest}</Text>
                        <Text>Audio Quality Test: {audioQualityTest}</Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}