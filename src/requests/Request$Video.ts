import YouTubeClient from "../YouTubeClient.js"
import YouTubeContext from "../YouTubeContext.js"
import Resource$Video from "../resources/watch/Video.js"
import { YouTubeConfigContext } from "../types/YouTubeConfig.js"
import Endpoint$Next from "./base-requests/Endpoint$Next.js"
import Endpoint$Player from "./base-requests/Endpoint$Player.js"


export type SearchParams$Video = {
    videoId: string,
    playlistId?: string,
    index?: number,
    params?: string
}

export async function Request$Video(searchParams: SearchParams$Video, client: YouTubeClient, context: YouTubeContext) {

    const videoNextBody = JSON.stringify(new Body$NextVideo(searchParams, client.config, context))
    const next = Endpoint$Next.post(videoNextBody, client, context)

    const videoPlayerBody = JSON.stringify(new Body$PlayerVideo(searchParams, client.config, context))
    const player = Endpoint$Player.post(videoPlayerBody, client, context)

    const data = {
        next: await next,
        player: await player
    }
    const res = Resource$Video.parse(data, client, context);
    return res;
}

class Body$NextVideo {
    context: YouTubeConfigContext['INNERTUBE_CONTEXT']
    videoId: string;
    playlistId?: string;
    index?: number;
    params?: string;
    racyCheckOk = false;
    contentCheckOk = false;
    autonavState = "STATE_NONE";
    playbackContext = {
        vid: 0,
        lactMilliseconds: "-1"
    }
    captionsRequested = false;

    constructor(params: SearchParams$Video, config: YouTubeConfigContext, context: YouTubeContext) {
        this.context = config.INNERTUBE_CONTEXT;
        this.videoId = params.videoId;
        this.playlistId = params.playlistId;
        this.index = params.index;
    }
}

class Body$PlayerVideo {
    context: YouTubeConfigContext['INNERTUBE_CONTEXT']
    videoId: string;
    playlistId?: string;
    index?: number;
    racyCheckOk = false;
    contentCheckOk = false;
    playbackContext: {
        contentPlaybackContext: any
    }

    constructor(params: SearchParams$Video, config: YouTubeConfigContext, context: YouTubeContext) {
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
        }
    }
}