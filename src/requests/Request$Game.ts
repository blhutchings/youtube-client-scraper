import YouTubeClient from "../clients/YouTubeClient.js";
import YouTubeContext from "../YouTubeContext.js";
import { Resource$Game } from "../resources/channel/game/Game.js";
import { YouTubeConfigContext } from "../types/YouTubeConfig.js";
import ResourceParseError from "../util/ParserError.js";
import Endpoint$Browse from "./base-requests/Endpoint$Browse.js";

const tabParams = {
    home: "EgRob21l",
    live: "EgRsaXZl",
    recent: "EgZyZWNlbnQ%3D",
    about: "EgVhYm91dA%3D%3D"
}

const urlMap = {
    home: (browseId: string) => `channel/${browseId}/home`,
    live: (browseId: string) => `channel/${browseId}/live`,
    recent: (browseId: string) => `channel/${browseId}/recent`,
    about: (browseId: string) => `channel/${browseId}/about`
}

export type SearchParams$Game = {
    browseId: string,
    tab: keyof typeof tabParams
}

export async function Request$Game(searchParams: SearchParams$Game, client: YouTubeClient, context: YouTubeContext) {
    context.currentUrl = urlMap[searchParams.tab](searchParams.browseId)
    const body = JSON.stringify(new Body$Account(searchParams, client.config))
    const data = await Endpoint$Browse.post(body, client, context)
    try {
        return Resource$Game.parse(data, client, context);
    } catch (err) {
        throw new ResourceParseError(JSON.stringify(data), context)
    }
}

export class Body$Account {
    context: YouTubeConfigContext['INNERTUBE_CONTEXT'];
    browseId: string;
    params: string;

    constructor(params: SearchParams$Game, config: YouTubeConfigContext) {
        this.context = config.INNERTUBE_CONTEXT;
        this.browseId = params.browseId;
        this.params = tabParams[params.tab];
    }
}
