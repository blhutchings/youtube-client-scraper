import YouTubeClient from "../../clients/YouTubeClient.js";
import YouTubeContext from "../../YouTubeContext.js";
import { Schema$Video, Data$Video } from "./Video.js";
export interface Schema$VideoPlayability {
    status?: string;
    reason?: string;
    trailer?: Schema$Video;
}
export default class Resource$VideoPlayability {
    static parse(data: Data$Video, client: YouTubeClient, context: YouTubeContext): Schema$VideoPlayability;
}
