
const TIME_WINDOW = 3; //3 seconds
const TIME_SPAN_AUDIO_TEST = 20;
import { CHECK_AUDIO_QUALITY_BANDWIDTH_TOO_LOW, CHECK_VIDEO_QUALITY_AUDIO_ONLY } from './constants';

class AudioStats {
    constructor() {
        this.startTestTime = 0;
        this.prevAudioTimestamp = 0;
        this.prevAudioPacketsLost = 0;
        this.prevAudioPacketsRcvd = 0;
        this.prevAudioBytes = 0;
        this.audioPLRatio = 0;
        this.audioBw = 0;
        this.audioOnlyThreshold = 25e3;
        this.audioPLThreshold = 0.05;
        this.testDone = false;
        this.result = null;
    }

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

    checkAudioStats ( stats ) {
        let audioTimestamp = Date.now() / 1000;
        if ( this.prevAudioTimestamp === 0 ) {
            this.prevAudioTimestamp = audioTimestamp;
            this.prevAudioBytes = stats.audioBytesReceived;
        }
        if ( audioTimestamp - this.prevAudioTimestamp >= TIME_WINDOW ) {
            //calculate audio packets lost ratio
            if ( this.prevAudioPacketsRcvd !== 0 ) {
                const pl = stats.audioPacketsLost - this.prevAudioPacketsLost;
                let pr = stats.audioPacketsReceived - this.prevAudioPacketsRcvd;
                let pt = pl + pr;

                if ( pt > 0 ) {
                    this.audioPLRatio = pl / pt;
                }
            }

            this.prevAudioPacketsLost = stats.audioPacketsLost;
            this.prevAudioPacketsRcvd = stats.audioPacketsReceived;

            //calculate audio bandwidth
            this.audioBw = ( ( 8 * ( stats.audioBytesReceived - this.prevAudioBytes ) ) / ( audioTimestamp - this.prevAudioTimestamp ) );

            this.prevAudioTimestamp = audioTimestamp;
            this.prevAudioBytes = stats.audioBytesReceived;
        }
    }

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
}

export {
    AudioStats
}
