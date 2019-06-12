# OpenTok Network Test

This sample application shows how to use the OpenTok React Native library to determine the appropriate audio and video settings to use in publishing a stream to an OpenTok session. To do this, the app publishes a test
stream to a test session and then uses the API to check the quality of that stream. Based on the
quality, the app determines what the client can successfully publish to an OpenTok session:

- The client can publish an audio-video stream at the specified resolution.

- The client can publish an audio-only stream.

- The client is unable to publish.

The sample app only subscribes to the test stream. It does not subscribe to other streams in the
test session. Do not use the test session for your actual call. Use a separate OpenTok session
(and session ID) to share audio-video streams between clients.

## Configure

Before running the application, you need to configure it to use the API key
of your OpenTok project, along with an OpenTok session ID and token.
For development purposes, you can obtain a session ID and token by navigating
to your [TokBox account](https://tokbox.com/account/#/) page, selecting a
project, and scrolling to the bottom of the page where it says `Generate Token`.

Then, you can run it with the following steps:

1. `cp config.sample.js config.json`
1. Edit `config.js`:
1. Add your OpenTok API key, Session ID and Token (https://tokbox.com/account/)

**Note:** if you want to run the test in `audioOnly`, you can set the variable in the App.js file.

## Run

### Android

- Run `npm run android`.

**_Note: If you're running the app on the simulator, you will see a simulation
for your publisher because the simulator doesn't have a camera._**

### iOS

- Run `npm run ios`.

**_Note: If you're running the app on the simulator, you will see a simulation
for your publisher because the simulator doesn't have a camera._**

## Understanding the code

The App.js file connects to the test OpenTok session. Upon connecting to the session,
the app initializes an OpenTok Publisher object it uses to test stream quality.
Upon publishing, the app subscribes to the test stream it publishes:

```javascript
/**
 * This function subscribe to his own stream.
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
```

The code sets up audioNetworkStats and videoNetworkStats listeners for the subscriber.
The `this.AudioStatsHandler.init(obj.audioStats)` method and `this.VideoStatsHandler.init( obj.videoStats )` are called periodically, when
statistics for the subscriber become available. The `stats` object passed into these
methods contain statistics for the stream's audio (or video):

```javascript
// AudioStats.js file

init ( stats ) {
        return new Promise( ( resolve ) => {
            if ( !this.testDone ) {
                if ( this.startTestTime === 0 ) {
                    this.startTestTime = Date.now() / 1000;
                }
                this.checkAudioStats( stats );
                const now = Date.now() / 1000;
                // After 20 seconds start the Audio Test
                if ( now - this.startTestTime > TIME_SPAN_AUDIO_TEST ) {
                    this.result = this.checkAudioQuality();
                    resolve( this.result );
                }
            } else {
                resolve( this.result );
            }
        } )
    }
```

The `stats` object pass into the `VideoStats.init()` has properties that
define statistics for the video:

- `videoBytesReceived` -- The cumulative number of video bytes received by the subscriber.

- `videoPacketsLost` -- The cumulative number of video packets lost by the subscriber.

- `videoPacketsReceived` -- The cumulative number of video packets received by the
  subscriber.

This `stats` object is passed into the `checkVideoStats()` method. This method calculates
the video packet loss (based on the values of `stats.videoPacketsLost` and
`stats.videoPacketsReceived`) and stores it in the `this.videoPLRatio` property. And it stores
the video bandwidth (based on the value of `stats.videoBytesReceived`) in the `this.videoBw`
property:

```javascript
checkVideoStats ( stats ) {
        let videoTimestamp = Date.now() / 1000;
        if ( this.prevVideoTimestamp === 0 ) {
            this.prevVideoTimestamp = videoTimestamp;
            this.prevVideoBytes = stats.videoBytesReceived;
        }
        if ( videoTimestamp - this.prevVideoTimestamp >= TIME_WINDOW ) {
            //calculate video packets lost ratio
            if ( this.prevVideoPacketsRcvd !== 0 ) {
                const pl = stats.videoPacketsLost - this.prevVideoPacketsLost;
                let pr = stats.videoPacketsReceived - this.prevVideoPacketsRcvd;
                let pt = pl + pr;

                if ( pt > 0 ) {
                    this.videoPLRatio = pl / pt;
                }
            }

            this.prevVideoPacketsLost = stats.videoPacketsLost;
            this.prevVideoPacketsRcvd = stats.videoPacketsReceived;

            //calculate video bandwidth
            this.videoBw = ( ( 8 * ( stats.videoBytesReceived - this.prevVideoBytes ) ) / ( videoTimestamp - this.prevVideoTimestamp ) );

            this.prevVideoTimestamp = videoTimestamp;
            this.prevVideoBytes = stats.videoBytesReceived;
        }
    }
```

After 15 seconds (`TIME_WINDOW`), the `checkVideoQuality()` method is called. The
`checkVideoQuality()` method checks to see if the video bandwidth (`this.videoBw`) and
the packet loss ratio (`this.videoPLRatio`) are outside of acceptable thresholds for video,
and return an object as result. If the video quality is acceptable, the
app disconnects the OpenTok session (and skips the AudioTest):

```javascript
checkVideoQuality () {
        this.testDone = true;
        if ( this.videoBw < this.audioOnlyThreshold || this.videoPLRatio > this.videoPLThreshold ) {
            //go to audio call to check the quality with video disabled
            this.audioOnly = true;
            return {
                audioOnly: this.audioOnly,
                message: 'Your bandwidth is too low for video',
                result: CHECK_VIDEO_QUALITY_AUDIO_ONLY
            }
        }
        return {
            audioOnly: this.audioOnly,
            message: 'All good, you are all set',
            result: CHECK_VIDEO_QUALITY_AUDIO_VIDEO
        }
    }
```

20 seconds after the subscriber starts receiving stream data (5 seconds after the video test
is completed), the app calls the `checkAudioQuality` method.

The `checkAudioQuality()` method checks the audio packet loss ratio collected by the
`this.AudioStatsHandler.checkAudioStats` method. It then notifies the user whether a voice-only
call is supported, based on the packet loss ratio:

```javascript
checkAudioQuality () {
        this.testDone = true;
        if ( this.audioBw < this.audioOnlyThreshold || this.audioPLRatio > this.audioPLThreshold ) {
            return {
                message: 'Not good, you can\'t connect successfully',
                result: CHECK_AUDIO_QUALITY_BANDWIDTH_TOO_LOW
            }
        } else {
            return {
                message: 'Voice only, Your bandwidth is too low for video',
                result: CHECK_VIDEO_QUALITY_AUDIO_ONLY
            }
        }
    }
```

Note that this sample app uses thresholds based on the table in the [Thresholds and interpreting
network statistics](https://github.com/opentok/opentok-network-test#thresholds-and-interpreting-network-statistics). You may change the threshold
values used in your own app, based on the video resolution your app uses and your quality
requirements.
