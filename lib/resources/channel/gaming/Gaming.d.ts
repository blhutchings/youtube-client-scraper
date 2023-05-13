import YouTubeClient from "../../../clients/YouTubeClient.js";
import YouTubeContext from "../../../YouTubeContext.js";
import { Schema$GamingLive } from "./GamingLive.js";
import { Schema$GamingSnippet } from "./GamingSnippet.js";
import { Schema$GamingTrending } from "./GamingTrending.js";
export interface Schema$Gaming {
    id?: string;
    snippet?: Schema$GamingSnippet;
    live?: Schema$GamingLive;
    trending?: Schema$GamingTrending;
}
export interface Map$Gaming {
    header?: Record<string, any>;
    live?: Record<string, any>[];
    trending?: Record<string, any>[];
}
export declare class Resource$Gaming {
    static parse(data: Record<string, any>, client: YouTubeClient, context: YouTubeContext): Schema$Gaming;
    private static map;
}
