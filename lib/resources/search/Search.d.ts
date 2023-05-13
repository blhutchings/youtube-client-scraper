import YouTubeClient from "../../clients/YouTubeClient.js";
import YouTubeContext from "../../YouTubeContext.js";
import { Schema$SearchGame } from "./SearchGame.js";
import { Schema$SearchResults } from "./SearchResults.js";
export interface Schema$Search {
    estimatedResults?: number;
    results?: Schema$SearchResults;
    game?: Schema$SearchGame;
    relatedQueries?: string[];
}
export declare class Resource$Search {
    static parse(data: any, client: YouTubeClient, context: YouTubeContext): Schema$Search;
}
