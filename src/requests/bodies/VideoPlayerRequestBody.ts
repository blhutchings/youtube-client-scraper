export default class VideoPlayerRequestBody {
    context = {};
    racyCheckOk = false;
    contentCheckOk = false;
    playbackContext = {
        contentPlaybackContext: {
            currentUrl: '',
            vis: 0,
            splay: false,
            autoCaptionsDefaultOn: false,
            autoNavState: "STATE_NONE",
            html5Preference: "HTML5_PREF_WANTS",
            signatureTimestamp: undefined,
            referer: '',
            lactMilliseconds: "-1"
        }
    }
    videoId: string

    constructor(context: any, referer: string, videoId: string) {
        this.context = context;
        this.videoId = videoId
        this.playbackContext.contentPlaybackContext.referer = referer;
        this.playbackContext.contentPlaybackContext.currentUrl = `/watch?v=${videoId}`
    }
}