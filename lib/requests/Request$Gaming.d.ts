import YouTubeClient from "../clients/YouTubeClient.js";
import YouTubeContext from "../YouTubeContext.js";
import { YouTubeConfigContext } from "../types/YouTubeConfig.js";
declare const tabParams: {
    live: string;
    trending: string;
};
export type SearchParams$Gaming = {
    tab: keyof typeof tabParams;
};
export declare function Request$Gaming(searchParams: SearchParams$Gaming, client: YouTubeClient, context: YouTubeContext): Promise<import("../resources/channel/gaming/Gaming.js").Schema$Gaming>;
export declare class Body$Gaming {
    context: YouTubeConfigContext['INNERTUBE_CONTEXT'];
    browseId: string;
    params: string;
    constructor(params: SearchParams$Gaming, config: YouTubeConfigContext);
}
export {};
