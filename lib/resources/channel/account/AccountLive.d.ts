import YouTubeClient from "../../../clients/YouTubeClient.js";
import YouTubeContext from "../../../YouTubeContext.js";
import { Schema$RichItemRenderer } from "../../common/RichItemRenderer.js";
import { Map$Account } from "./Account.js";
export interface Schema$AccountLive {
    results?: Schema$RichItemRenderer[];
    continue: () => Promise<Schema$RichItemRenderer | undefined>;
}
export default class Resource$AccountLive {
    static parse(data: Map$Account, client: YouTubeClient, context: YouTubeContext): Schema$AccountLive;
}
