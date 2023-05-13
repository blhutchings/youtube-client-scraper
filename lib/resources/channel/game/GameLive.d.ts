import YouTubeClient from "../../../clients/YouTubeClient.js";
import YouTubeContext from "../../../YouTubeContext.js";
import { Schema$RichItemRenderer } from "../../common/RichItemRenderer.js";
import { Map$Game } from "./Game.js";
export interface Schema$GameLive {
    results?: Schema$RichItemRenderer[];
    continue: () => Promise<Schema$GameLive | undefined>;
}
export declare class Resource$GameLive {
    static parse(data: Map$Game, client: YouTubeClient, context: YouTubeContext): Schema$GameLive;
}
