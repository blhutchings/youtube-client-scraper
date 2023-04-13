import Resource$RichItemRenderer, { Schema$RichItemRenderer } from "../../common/RichItemRenderer.js";
import { Map$Game } from "./Game.js";

export interface Schema$GameRecent {
    results?: Schema$RichItemRenderer[];
    continue: () => Promise<Schema$RichItemRenderer | undefined>
}


export class Resource$GameRecent {
    static parse(data: Map$Game): Schema$GameRecent {
        let GameRecent: Schema$GameRecent = {
            continue: async () => { return undefined }
        };

        GameRecent['results'] = data.recent?.flatMap((item: any) => {
            if (item.gridVideoRenderer) {
                return Resource$RichItemRenderer.parse(item.gridVideoRenderer, 'videos')
            } else {
                return []
            }
        })

        // GameRecent['continue'] = async () => {}

        return GameRecent;
    }
}
