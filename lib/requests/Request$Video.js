import Resource$Video from "../resources/watch/Video.js";
import ResourceParseError from "../util/ResourceParseError.js";
import Endpoint$Next from "./base-requests/Endpoint$Next.js";
import Endpoint$Player from "./base-requests/Endpoint$Player.js";
export async function Request$Video(searchParams, client, context) {
    const videoNextBody = JSON.stringify(new Body$NextVideo(searchParams, client.config, context));
    const next = Endpoint$Next.post(videoNextBody, client, context);
    const videoPlayerBody = JSON.stringify(new Body$PlayerVideo(searchParams, client.config, context));
    const player = Endpoint$Player.post(videoPlayerBody, client, context);
    const data = {
        next: await next,
        player: await player
    };
    try {
        return Resource$Video.parse(data, client, context);
    }
    catch (err) {
        throw new ResourceParseError(err.message, JSON.stringify(data), context);
    }
}
class Body$NextVideo {
    context;
    videoId;
    playlistId;
    index;
    params;
    racyCheckOk = false;
    contentCheckOk = false;
    autonavState = "STATE_NONE";
    playbackContext = {
        vid: 0,
        lactMilliseconds: "-1"
    };
    captionsRequested = false;
    constructor(params, config, context) {
        this.context = config.INNERTUBE_CONTEXT;
        this.videoId = params.videoId;
        this.playlistId = params.playlistId;
        this.index = params.index;
    }
}
class Body$PlayerVideo {
    context;
    videoId;
    playlistId;
    index;
    racyCheckOk = false;
    contentCheckOk = false;
    playbackContext;
    constructor(params, config, context) {
        this.context = config.INNERTUBE_CONTEXT;
        this.videoId = params.videoId;
        this.playlistId = params.playlistId;
        this.index = params.index;
        this.playbackContext = {
            contentPlaybackContext: {
                currentUrl: context.currentUrl,
                vis: 0,
                splay: false,
                autoCaptionsDefaultOn: false,
                autoNavState: "STATE_NONE",
                html5Preference: "HTML5_PREF_WANTS",
                signatureTimestamp: undefined,
                referer: 'www.youtube.com',
                lactMilliseconds: "-1"
            }
        };
    }
}
