import YouTubeClient from "../../clients/YouTubeClient.js";
import YouTubeContext from "../../YouTubeContext.js";
import { Schema$RichItemRenderer } from "../common/RichItemRenderer.js";
export interface Schema$SearchResults {
    videos?: Schema$RichItemRenderer[];
    continue: () => Promise<Schema$SearchResults | undefined>;
}
export declare class Resource$SearchResults {
    static parse(contents: Record<string, any>, client: YouTubeClient, context: YouTubeContext): Schema$SearchResults;
}
