
const TIME_WINDOW = 3; // 3 seconds
const TIME_VIDEO_TEST = 15;
import {CHECK_VIDEO_QUALITY_AUDIO_VIDEO, CHECK_VIDEO_QUALITY_AUDIO_ONLY} from './constants';

class VideoStats {
    constructor(audioOnly) {
        this.startTestTime = 0;
        this.prevVideoTimestamp = 0;
        this.prevVideoPacketsLost = 0;
        this.prevVideoPacketsRcvd = 0;
        this.prevVideoBytes = 0;
        this.videoPLRatio = 0;
        this.videoBw = 0;
        this.audioOnlyThreshold = 15e3;
        this.videoPLThreshold = 0.03;
        this.testDone = false;
        this.result = null;
        this.audioOnly = audioOnly;
    }

    init ( stats ) {
        // it should handle the 15s interval
        return new Promise( ( resolve ) => {
            if ( !this.testDone ) {
                if ( this.startTestTime === 0 ) {
                    this.startTestTime = Date.now() / 1000;
                }
                this.checkVideoStats( stats );
                const now = Date.now() / 1000;
                if ( (now - this.startTestTime > TIME_VIDEO_TEST) && !this.audioOnly ) {
                    this.result = this.checkVideoQuality();
                    resolve( this.result );
                }
            } else {
                resolve( this.result );
            }
        } )
    }

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
}

export {
    VideoStats
}
