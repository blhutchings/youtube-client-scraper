import YouTubeContext from "../YouTubeContext.js";
import { YouTubeClient } from "../index.js";
import { Resource$GameTitle } from "../resources/gaming/GameTitle.js";
import { YouTubeConfigContext } from "../types/YouTubeConfig.js";
import ResourceParseError from "../util/ParserError.js";
import Endpoint$GameTitle from "./base-requests/Endpoint$GameTitle.js";

export type SearchParams$GameTitle = {
    query: string
}

export async function Request$GameTitle(searchParams: SearchParams$GameTitle, client: YouTubeClient, context: YouTubeContext) {
    const body = JSON.stringify(new Body$GameTitle(searchParams, client.config))
    const data = await Endpoint$GameTitle.post(body, client, context)
    try {
        return Resource$GameTitle.parse(data);
    } catch (err) {
        throw new ResourceParseError(JSON.stringify(data), context)
    }
}

export class Body$GameTitle {
    context: YouTubeConfigContext['INNERTUBE_CONTEXT'];
    userInput: string;

    constructor(params: SearchParams$GameTitle, config: YouTubeConfigContext) {
        this.context = config.INNERTUBE_CONTEXT;
        this.userInput = params.query;
    }
}