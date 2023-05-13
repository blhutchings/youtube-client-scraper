import { Body$Continuation } from "../../requests/Continuation.js";
import Endpoint$Next from "../../requests/base-requests/Endpoint$Next.js";
import Resource$CompactRenderer from "./secondary-result/CompactRenderer.js";
export default class Resource$VideoSecondaryResultDetails {
    static parse(data, client, context) {
        let VideoSecondaryResultDetails = {
            continue: async () => { return undefined; }
        };
        VideoSecondaryResultDetails['results'] = data.secondaryResults?.flatMap((renderer) => {
            if (!renderer['continuationItemRenderer']) {
                const result = Resource$CompactRenderer.parse(renderer, client, context);
                if (result) {
                    return result;
                }
                return [];
            }
            else {
                return [];
            }
        });
        const token = data?.secondaryResults?.findLast((item) => item?.continuationItemRenderer)?.continuationItemRenderer.continuationEndpoint.continuationCommand.token;
        if (token) {
            VideoSecondaryResultDetails['continue'] = async () => {
                const continuationContext = {
                    ...context,
                    referer: `https://www.youtube.com/${context.currentUrl}`
                };
                const continuationBody = JSON.stringify(new Body$Continuation({ continuation: token }, client.config));
                const continuationResponse = await Endpoint$Next.post(continuationBody, client, continuationContext);
                const items = continuationResponse.onResponseReceivedEndpoints[0].appendContinuationItemsAction.continuationItems;
                return Resource$VideoSecondaryResultDetails.parse({ secondaryResults: items }, client, context);
            };
        }
        return VideoSecondaryResultDetails;
    }
}
