import YouTubeClient from "../../../clients/YouTubeClient.js";
import YouTubeContext from "../../../YouTubeContext.js";
import { Schema$RichItemRenderer } from "../../common/RichItemRenderer.js";
import { Map$Gaming } from "./Gaming.js";
import { Schema$GamingLive } from "./GamingLive.js";
export interface Schema$GamingTrending {
    results?: Schema$RichItemRenderer[];
    continue: () => Promise<Schema$GamingTrending | undefined>;
}
export declare class Resource$GamingTrending {
    static parse(data: Map$Gaming, client: YouTubeClient, context: YouTubeContext): Schema$GamingLive;
}
