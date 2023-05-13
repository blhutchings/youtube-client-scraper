import { Body$Continuation } from "../../../requests/Continuation.js";
import Endpoint$Browse from "../../../requests/base-requests/Endpoint$Browse.js";
import Resource$RichItemRenderer from "../../common/RichItemRenderer.js";
export class Resource$GamingTrending {
    static parse(data, client, context) {
        let GamingTrending = {
            continue: async () => { return undefined; }
        };
        GamingTrending['results'] = data.live?.flatMap((item) => {
            if (item.gridVideoRenderer) {
                return Resource$RichItemRenderer.parse(item.gridVideoRenderer, 'video');
            }
            else {
                return [];
            }
        });
        const token = data.live?.findLast((item) => item?.continuationItemRenderer)?.continuationItemRenderer.continuationEndpoint.continuationCommand.token;
        if (token) {
            GamingTrending['continue'] = async () => {
                const continuationContext = {
                    ...context,
                    referer: `https://www.youtube.com/${context.currentUrl}`
                };
                const continuationBody = JSON.stringify(new Body$Continuation({ continuation: token }, client.config));
                const continuationResponse = await Endpoint$Browse.post(continuationBody, client, continuationContext);
                const items = continuationResponse.onResponseReceivedActions[0].appendContinuationItemsAction.continuationItems;
                return Resource$GamingTrending.parse({ live: items }, client, context);
            };
        }
        return GamingTrending;
    }
}
