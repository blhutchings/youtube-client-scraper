import YouTubeClient from "../clients/YouTubeClient.js";
import YouTubeContext from "../YouTubeContext.js";
import { YouTubeConfigContext } from "../types/YouTubeConfig.js";
declare const tabParams: {
    home: string;
    live: string;
    recent: string;
    about: string;
};
export type SearchParams$Game = {
    browseId: string;
    tab: keyof typeof tabParams;
};
export declare function Request$Game(searchParams: SearchParams$Game, client: YouTubeClient, context: YouTubeContext): Promise<import("../resources/channel/game/Game.js").Schema$Game>;
export declare class Body$Game {
    context: YouTubeConfigContext['INNERTUBE_CONTEXT'];
    browseId: string;
    params: string;
    constructor(params: SearchParams$Game, config: YouTubeConfigContext);
}
export {};
