import { Body$Continuation } from "../../../requests/Continuation.js";
import Endpoint$Browse from "../../../requests/base-requests/Endpoint$Browse.js";
import { Resource$GameCard } from "../../common/GameCard.js";
export class Resource$GamingLive {
    static parse(data, client, context) {
        let GamingLive = {
            continue: async () => { return undefined; }
        };
        GamingLive['results'] = data.live?.flatMap((item) => {
            if (item.gameCardRenderer?.game.gameDetailsRenderer) {
                return Resource$GameCard.parse(item.gameCardRenderer.game.gameDetailsRenderer);
            }
            else {
                return [];
            }
        });
        const token = data.live?.findLast((item) => item?.continuationItemRenderer)?.continuationItemRenderer.continuationEndpoint.continuationCommand.token;
        if (token) {
            GamingLive['continue'] = async () => {
                const continuationContext = {
                    ...context,
                    referer: `https://www.youtube.com/${context.currentUrl}`
                };
                const continuationBody = JSON.stringify(new Body$Continuation({ continuation: token }, client.config));
                const continuationResponse = await Endpoint$Browse.post(continuationBody, client, continuationContext);
                const items = continuationResponse.onResponseReceivedActions[0].appendContinuationItemsAction.continuationItems;
                return Resource$GamingLive.parse({ live: items }, client, context);
            };
        }
        return GamingLive;
    }
}
