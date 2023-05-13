import YouTubeClient from "../clients/YouTubeClient.js";
import YouTubeContext from "../YouTubeContext.js";
import { YouTubeConfigContext } from "../types/YouTubeConfig.js";
declare const tabParams: {
    videos: string;
    live: string;
    about: string;
};
export type SearchParams$Account = {
    browseId: string;
    tab: keyof typeof tabParams;
};
export declare function Request$Account(searchParams: SearchParams$Account, client: YouTubeClient, context: YouTubeContext): Promise<import("../resources/channel/account/Account.js").Schema$Account>;
export declare class Body$Account {
    context: YouTubeConfigContext['INNERTUBE_CONTEXT'];
    browseId: string;
    params: string;
    constructor(params: SearchParams$Account, config: YouTubeConfigContext);
}
export {};
