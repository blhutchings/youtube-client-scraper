import { Body$Continuation } from "../../../requests/Continuation.js";
import Endpoint$Browse from "../../../requests/base-requests/Endpoint$Browse.js";
import Resource$RichItemRenderer from "../../common/RichItemRenderer.js";
export class Resource$GameLive {
    static parse(data, client, context) {
        let GameLive = {
            continue: async () => { return undefined; }
        };
        GameLive['results'] = data?.live?.flatMap((item) => {
            if (item?.gridVideoRenderer) {
                return Resource$RichItemRenderer.parse(item.gridVideoRenderer, 'live');
            }
            else {
                return [];
            }
        });
        const token = data.live?.findLast((item) => item?.continuationItemRenderer)?.continuationItemRenderer.continuationEndpoint.continuationCommand.token;
        if (token) {
            GameLive['continue'] = async () => {
                const continuationContext = {
                    ...context,
                    referer: `https://www.youtube.com/${context.currentUrl}`
                };
                const continuationBody = JSON.stringify(new Body$Continuation({ continuation: token }, client.config));
                const continuationResponse = await Endpoint$Browse.post(continuationBody, client, continuationContext);
                const items = continuationResponse.onResponseReceivedActions[0].appendContinuationItemsAction.continuationItems;
                return Resource$GameLive.parse({ live: items }, client, context);
            };
        }
        return GameLive;
    }
}
