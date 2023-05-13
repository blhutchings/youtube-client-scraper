import YouTubeClient from "../../../clients/YouTubeClient.js";
import YouTubeContext from "../../../YouTubeContext.js";
import { Map$Gaming } from "./Gaming.js";
import { Schema$GameCard } from "../../common/GameCard.js";
export interface Schema$GamingLive {
    results?: Schema$GameCard[];
    continue: () => Promise<Schema$GamingLive | undefined>;
}
export declare class Resource$GamingLive {
    static parse(data: Map$Gaming, client: YouTubeClient, context: YouTubeContext): Schema$GamingLive;
}
