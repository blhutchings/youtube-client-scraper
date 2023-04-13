import YouTubeClient from "../clients/YouTubeClient.js"
import YouTubeContext from "../YouTubeContext.js"
import { Resource$Search } from "../resources/search/Search.js"
import { YouTubeConfigContext } from "../types/YouTubeConfig.js"
import ResourceParseError from "../util/ParserError.js"
import Endpoint$Search from "./base-requests/Endpoint$Search.js"

const urlMap = (query: string) => {
    return `results?search_query=${query}`
}

export type SearchParams$Search = {
    query: string
}

export async function Request$Search(searchParams: SearchParams$Search, client: YouTubeClient, context: YouTubeContext) { 
    context.currentUrl = urlMap(searchParams.query)
    const body = JSON.stringify(new Body$Search(searchParams, client.config))
    const data = await Endpoint$Search.post(body, client, context)

    try {
        return Resource$Search.parse(data, client, context);
    } catch (err) {
        throw new ResourceParseError(JSON.stringify(data), context)
    }
}

export class Body$Search  {
    context: YouTubeConfigContext['INNERTUBE_CONTEXT'];
    query: string;

    constructor(params: SearchParams$Search, config: YouTubeConfigContext) {
        this.context = config.INNERTUBE_CONTEXT;
        this.query = params.query;
    }
}
