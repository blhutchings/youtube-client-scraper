import YouTubeContext from "../YouTubeContext.js";
import YouTubeClient from "../clients/YouTubeClient.js";
import { YouTubeConfigContext } from "../types/YouTubeConfig.js";
export type SearchParams$GameTitle = {
    query: string;
};
export declare function Request$GameTitle(searchParams: SearchParams$GameTitle, client: YouTubeClient, context: YouTubeContext): Promise<import("../resources/gaming/GameTitle.js").Schema$GameTitle>;
export declare class Body$GameTitle {
    context: YouTubeConfigContext['INNERTUBE_CONTEXT'];
    userInput: string;
    constructor(params: SearchParams$GameTitle, config: YouTubeConfigContext);
}
