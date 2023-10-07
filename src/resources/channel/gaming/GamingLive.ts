import YouTubeClient from "../../../clients/YouTubeClient.js";
import YouTubeContext from "../../../clients/YouTubeContext.js";
import { Body$Continuation } from "../../../requests/Continuation.js";
import Endpoint$Browse from "../../../requests/base-requests/Endpoint$Browse.js";
import { Map$Gaming } from "./Gaming.js";
import { Schema$GameCard, Resource$GameCard } from "../../common/GameCard.js";

export interface Schema$GamingLive {
    results?: Schema$GameCard[];
    continue: () => Promise<Schema$GamingLive | undefined>;
}

export class Resource$GamingLive {
    static parse(data: Map$Gaming, client: YouTubeClient, context: YouTubeContext): Schema$GamingLive {
        let GamingLive: Schema$GamingLive = {
            continue: async () => { return undefined }
        };

        GamingLive['results'] = data.live?.flatMap((item: any) => {
            if (item.gameCardRenderer?.game.gameDetailsRenderer) {
                return Resource$GameCard.parse(item.gameCardRenderer.game.gameDetailsRenderer)
            } else {
                return []
            }
        })

        const token = data.live?.findLast((item: any) => item?.continuationItemRenderer)?.continuationItemRenderer.continuationEndpoint.continuationCommand.token
        if (token) {
            GamingLive['continue'] = async () => {
                const continuationContext = {
                    ...context,
                    referer: `https://www.youtube.com/${context.currentUrl}`
                }
    
                const continuationBody = JSON.stringify(new Body$Continuation({ continuation: token }, client.config));
                const continuationResponse = await Endpoint$Browse.post(continuationBody, client, continuationContext);
                const items = continuationResponse.onResponseReceivedActions[0].appendContinuationItemsAction.continuationItems
                return Resource$GamingLive.parse({ live: items }, client, context)
            }
        }
        return GamingLive;
    }
}


