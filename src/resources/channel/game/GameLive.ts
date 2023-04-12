import YouTubeClient from "../../../YouTubeClient.js";
import YouTubeContext from "../../../YouTubeContext.js";
import { Body$Continuation } from "../../../requests/Continuation.js";
import Endpoint$Browse from "../../../requests/base-requests/Endpoint$Browse.js";
import Resource$RichItemRenderer, { Schema$RichItemRenderer } from "../../common/RichItemRenderer.js";
import { Map$Game } from "./Game.js";

export interface Schema$GameLive {
    results?: Schema$RichItemRenderer[];
    continue: () => Promise<Schema$GameLive | undefined>;
}

export class Resource$GameLive {
    static parse(data: Map$Game, client: YouTubeClient, context: YouTubeContext): Schema$GameLive {
        let GameLive: Schema$GameLive = {
            continue: async () => { return undefined }
        };

        GameLive['results'] = data?.live?.flatMap((item: any) => {
            if (item?.gridVideoRenderer) {
                return Resource$RichItemRenderer.parse(item.gridVideoRenderer, 'live')
            } else {
                return []
            }
        })

        const token = data.live?.findLast((item: any) => item?.continuationItemRenderer)?.continuationItemRenderer.continuationEndpoint.continuationCommand.token
        if (token) {
            GameLive['continue'] = async () => {
                const continuationContext = {
                    ...context,
                    referer: `https://www.youtube.com/${context.currentUrl}`
                }
    
                const continuationBody = JSON.stringify(new Body$Continuation({ continuation: token }, client.config));
                const continuationResponse = await Endpoint$Browse.post(continuationBody, client, continuationContext);
                const items = continuationResponse.onResponseReceivedActions[0].appendContinuationItemsAction.continuationItems
                return Resource$GameLive.parse({ live: items }, client, context)
            }
        }
        return GameLive;
    }
}
