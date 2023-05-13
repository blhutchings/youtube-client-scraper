import YouTubeClient from "../clients/YouTubeClient.js";
import YouTubeContext from "../YouTubeContext.js";
import { YouTubeConfigContext } from "../types/YouTubeConfig.js";
export type SearchParams$Search = {
    query: string;
};
export declare function Request$Search(searchParams: SearchParams$Search, client: YouTubeClient, context: YouTubeContext): Promise<import("../resources/search/Search.js").Schema$Search>;
export declare class Body$Search {
    context: YouTubeConfigContext['INNERTUBE_CONTEXT'];
    query: string;
    constructor(params: SearchParams$Search, config: YouTubeConfigContext);
}
