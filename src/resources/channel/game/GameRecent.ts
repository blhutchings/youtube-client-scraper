import Resource$RichItemRenderer, { Schema$RichItemRenderer } from "../../common/RichItemRenderer.js";
import { Map$Game } from "./Game.js";

export interface Schema$GameRecent {
    results?: Schema$RichItemRenderer[];
    continue?: () => Promise<any>
}


export class Resource$GameRecent {
    static parse(data: Map$Game): Schema$GameRecent {
        let AccountVideos: Schema$GameRecent = {};

        AccountVideos['results'] = data.recent?.flatMap((item: any) => {
            if (item.gridVideoRenderer) {
                return Resource$RichItemRenderer.parse(item.gridVideoRenderer, 'videos')
            } else {
                return []
            }
        })

        AccountVideos['continue'] = async () => {}

        return AccountVideos;
    }
}
