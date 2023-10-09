import YouTubeClient from "../clients/YouTubeClient.js"
import YouTubeContext from "../clients/YouTubeContext.js"
import Resource$Video from "../resources/watch/Video.js"
import { YouTubeConfig } from "../types/YouTubeConfig.js"
import ResourceParseError from "../util/ResourceParseError.js"
import { YouTubeClientScraperError } from "../util/YouTubeClientScraperError.js"
import Endpoint$Next from "./base-requests/Endpoint$Next.js"
import Endpoint$Player from "./base-requests/Endpoint$Player.js"


export type SearchParams$Video = {
    videoId: string,
    playlistId?: string,
    index?: number,
    params?: string,
	next?: boolean,
	player?: boolean
}

export async function Request$Video(searchParams: SearchParams$Video, client: YouTubeClient, context: YouTubeContext) {
	let next = undefined
	if (searchParams.next === undefined || searchParams.next === true) {
		const videoNextBody = JSON.stringify(new Body$NextVideo(searchParams, client.config, context))
		next = Endpoint$Next.post(videoNextBody, client, context)
	}

	let player = undefined
	if (searchParams.player === undefined || searchParams.player === true) {
		const videoPlayerBody = JSON.stringify(new Body$PlayerVideo(searchParams, client.config, context))
		player = Endpoint$Player.post(videoPlayerBody, client, context)
	}
    const data = {
        next: await next,
        player: await player
    }

    try {
        return Resource$Video.parse(data, client, context);
    } catch (err: any) {
		if (err instanceof YouTubeClientScraperError) {
			throw err
		}
        throw new ResourceParseError(err.message, JSON.stringify(data), context)
    }
}

class Body$NextVideo {
    context: YouTubeConfig['INNERTUBE_CONTEXT']
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

    constructor(params: SearchParams$Video, config: YouTubeConfig, context: YouTubeContext) {
        this.context = config.INNERTUBE_CONTEXT;
        this.videoId = params.videoId;
        this.playlistId = params.playlistId;
        this.index = params.index;
    }
}

class Body$PlayerVideo {
    context: YouTubeConfig['INNERTUBE_CONTEXT']
    videoId: string;
    playlistId?: string;
    index?: number;
    racyCheckOk = false;
    contentCheckOk = false;
    playbackContext: {
        contentPlaybackContext: any
    }

    constructor(params: SearchParams$Video, config: YouTubeConfig, context: YouTubeContext) {
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