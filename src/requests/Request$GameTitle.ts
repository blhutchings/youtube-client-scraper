import YouTubeContext from "../clients/YouTubeContext.js";
import YouTubeClient from "../clients/YouTubeClient.js";
import { Resource$GameTitle } from "../resources/gaming/GameTitle.js";
import ResourceParseError from "../util/ResourceParseError.js";
import Endpoint$GameTitle from "./base-requests/Endpoint$GameTitle.js";
import { YouTubeClientScraperError } from "../util/YouTubeClientScraperError.js";
import { YouTubeConfig } from "../types/YouTubeConfig.js";

export type SearchParams$GameTitle = {
    query: string
}

export async function Request$GameTitle(searchParams: SearchParams$GameTitle, client: YouTubeClient, context: YouTubeContext) {
    const body = JSON.stringify(new Body$GameTitle(searchParams, client.config))
    const data = await Endpoint$GameTitle.post(body, client, context)
    try {
        return Resource$GameTitle.parse(data);
    } catch (err: any) {
		if (err instanceof YouTubeClientScraperError) {
			throw err
		}
        throw new ResourceParseError(err.message, JSON.stringify(data), context)
    }
}

export class Body$GameTitle {
    context: YouTubeConfig['INNERTUBE_CONTEXT'];
    userInput: string;

    constructor(params: SearchParams$GameTitle, config: YouTubeConfig) {
        this.context = config.INNERTUBE_CONTEXT;
        this.userInput = params.query;
    }
}