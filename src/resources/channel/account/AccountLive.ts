import YouTubeClient from "../../../clients/YouTubeClient.js";
import YouTubeContext from "../../../YouTubeContext.js";
import Resource$RichItemRenderer, { Schema$RichItemRenderer } from "../../common/RichItemRenderer.js";
import { Map$Account } from "./Account.js";

export interface Schema$AccountLive {
    results?: Schema$RichItemRenderer[];
    continue: () => Promise<Schema$RichItemRenderer | undefined>;
}

export default class Resource$AccountLive {

    static parse(data: Map$Account, client: YouTubeClient, context: YouTubeContext): Schema$AccountLive {
        let AccountLive : Schema$AccountLive = {
            continue: async () => { return undefined }
        };

        AccountLive ['results'] = data?.live.contents.flatMap((content: any) => {
            if (content.richItemRenderer?.content.videoRenderer) {
                return Resource$RichItemRenderer.parse(content.richItemRenderer.content.videoRenderer, 'live')
            } else {
                return []
            }
        })

        // AccountLive ['continue'] = async () => {}

        return AccountLive ;
    }
}
