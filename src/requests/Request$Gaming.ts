import YouTubeClient from "../clients/YouTubeClient.js";
import YouTubeContext from "../YouTubeContext.js";
import { Resource$Gaming } from "../resources/channel/gaming/Gaming.js";
import { YouTubeConfigContext } from "../types/YouTubeConfig.js";
import ResourceParseError from "../util/ResourceParseError.js";
import Endpoint$Browse from "./base-requests/Endpoint$Browse.js";

const tabParams = {
    live: 'EgVnYW1lcw%3D%3D',
    trending: 'Egh0cmVuZGluZw%3D%3D',
}

const urlMap = {
    live: 'gaming/games',
    trending: 'gaming/trending'
}

export type SearchParams$Gaming = {
    tab: keyof typeof tabParams
}

export async function Request$Gaming(searchParams: SearchParams$Gaming, client: YouTubeClient, context: YouTubeContext) {
    context.currentUrl = urlMap[searchParams.tab]
    const body = JSON.stringify(new Body$Gaming(searchParams, client.config))
    const data = await Endpoint$Browse.post(body, client, context)
    try {
        return Resource$Gaming.parse(data, client, context);
    } catch (err: any) {
        throw new ResourceParseError(err.message, JSON.stringify(data), context)
    }
}

export class Body$Gaming {
    context: YouTubeConfigContext['INNERTUBE_CONTEXT'];
    browseId = "UCOpNcN46UbXVtpKMrmU4Abg";
    params: string;

    constructor(params: SearchParams$Gaming, config: YouTubeConfigContext) {
        this.context = config.INNERTUBE_CONTEXT;
        this.params = tabParams[params.tab];
    }
}
