export default class VideoNextRequestBody {
    context = {};
    racyCheckOk = false;
    contentCheckOk = false;
    autonavState = "STATE_NONE";
    playbackContext = {
        vid: 0,
        lactMilliseconds: "-1"
    }
    captionsRequested = false;
    videoId: string

    constructor(context: any, videoId: string) {
        this.context = context;
        this.videoId = videoId
    }
}