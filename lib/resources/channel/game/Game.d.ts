import YouTubeClient from "../../../clients/YouTubeClient.js";
import YouTubeContext from "../../../YouTubeContext.js";
import { Schema$GameAbout } from "./GameAbout.js";
import { Schema$GameLive } from "./GameLive.js";
import { Schema$GameRecent } from "./GameRecent.js";
import { Schema$GameSnippet } from "./GameSnippet.js";
import { Schema$GameHome } from "./GameHome.js";
export interface Schema$Game {
    id?: string;
    snippet?: Schema$GameSnippet;
    home?: Schema$GameHome;
    live?: Schema$GameLive;
    recent?: Schema$GameRecent;
    about?: Schema$GameAbout;
}
export type Map$Game = {
    header?: any;
    microformat?: any;
    home?: any[];
    live?: any[];
    recent?: any;
    about?: any;
};
export declare class Resource$Game {
    static parse(data: any, client: YouTubeClient, context: YouTubeContext): Schema$Game;
    private static map;
    private static tabMap;
}
