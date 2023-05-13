import YouTubeClient from "../../../clients/YouTubeClient.js";
import YouTubeContext from "../../../YouTubeContext.js";
import { Schema$AccountAbout } from "./AccountAbout.js";
import { Schema$AccountLive } from "./AccountLive.js";
import { Schema$AccountSnippet } from "./AccountSnippet.js";
import { Schema$AccountVideos } from "./AccountVideos.js";
export interface Schema$Account {
    id?: string;
    snippet?: Schema$AccountSnippet;
    about?: Schema$AccountAbout;
    live?: Schema$AccountLive;
    videos?: Schema$AccountVideos;
}
export type Map$Account = {
    header?: any;
    metadata?: any;
    microformat?: any;
    videos?: any;
    live?: any;
    about?: any;
};
export declare class Resource$Account {
    static parse(data: any, client: YouTubeClient, context: YouTubeContext): Schema$Account;
    private static map;
    private static tabMap;
}
