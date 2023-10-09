import YouTubeClient from "../clients/YouTubeClient.js";
import YouTubeContext from "../clients/YouTubeContext.js";
import { Resource$Game } from "../resources/channel/game/Game.js";
import { YouTubeConfig } from "../types/YouTubeConfig.js";
import ResourceParseError from "../util/ResourceParseError.js";
import { YouTubeClientScraperError } from "../util/YouTubeClientScraperError.js";
import Endpoint$Browse from "./base-requests/Endpoint$Browse.js";

const tabParams = {
    home: "EgRob21l",
    live: "EgRsaXZl",
    recent: "EgZyZWNlbnQ%3D",
	offical: "EghvZmZpY2lhbA%3D%3D",
    about: "EgVhYm91dA%3D%3D"
}

const urlMap = {
    home: (browseId: string) => `channel/${browseId}/home`,
    live: (browseId: string) => `channel/${browseId}/live`,
    recent: (browseId: string) => `channel/${browseId}/recent`,
	offical: (browseId: string) => `channel/${browseId}/offical`,
    about: (browseId: string) => `channel/${browseId}/about`
}

export type SearchParams$Game = {
    browseId: string,
    tab: keyof typeof tabParams 
}

export async function Request$Game(searchParams: SearchParams$Game, client: YouTubeClient, context: YouTubeContext) {
    context.currentUrl = urlMap[searchParams.tab](searchParams.browseId)
    const body = JSON.stringify(new Body$Game(searchParams, client.config))
    const data = await Endpoint$Browse.post(body, client, context)
    try {
        return Resource$Game.parse(data, client, context);
    } catch (err: any) {
		if (err instanceof YouTubeClientScraperError) {
			throw err
		}
        throw new ResourceParseError(err.message, data, context)
    }
}

export class Body$Game {
    context: YouTubeConfig['INNERTUBE_CONTEXT'];
    browseId: string;
    params: string;

    constructor(params: SearchParams$Game, config: YouTubeConfig) {
        this.context = config.INNERTUBE_CONTEXT;
        this.browseId = params.browseId;
        this.params = tabParams[params.tab];
    }
}
