import YouTubeClient from "../../../clients/YouTubeClient.js";
import YouTubeContext from "../../../YouTubeContext.js";
import Resource$RichItemRenderer, { Schema$RichItemRenderer } from "../../common/RichItemRenderer.js";
import { Map$Account } from "./Account.js";


export interface Schema$AccountVideos {
    results?: Schema$RichItemRenderer[];
    continue?: () => Promise<any>
}

export default class Resource$AccountVideos {
    static parse(data: Map$Account, client: YouTubeClient, context: YouTubeContext): Schema$AccountVideos {
        let AccountVideos: Schema$AccountVideos = {};

        AccountVideos['results'] = data.videos?.contents?.flatMap((content: any) => {
            if (content?.richItemRenderer?.content?.videoRenderer) {
                return Resource$RichItemRenderer.parse(content?.richItemRenderer?.content?.videoRenderer, 'videos')
            } else {
                return []
            }
        })

        AccountVideos['continue'] = async () => {}

        return AccountVideos;
    }
}
