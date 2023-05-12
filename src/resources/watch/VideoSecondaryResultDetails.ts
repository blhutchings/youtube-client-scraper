import YouTubeClient from "../../clients/YouTubeClient.js";
import YouTubeContext from "../../YouTubeContext.js";
import { Body$Continuation } from "../../requests/Continuation.js";
import Endpoint$Next from "../../requests/base-requests/Endpoint$Next.js";
import { Map$Video } from "./Video.js";
import Resource$CompactRenderer from "./secondary-result/CompactRenderer.js";
import { Schema$CompactRendererMovie } from "./secondary-result/CompactRendererMovie.js";
import { Schema$CompactRendererPlaylist } from "./secondary-result/CompactRendererPlaylist.js";
import { Schema$CompactRendererVideo } from "./secondary-result/CompactRendererVideo.js";


export interface Schema$VideoSecondaryResultDetails {
    results?: (Schema$CompactRendererPlaylist | Schema$CompactRendererVideo | Schema$CompactRendererMovie)[];
    continue: () => Promise<Schema$VideoSecondaryResultDetails | undefined>;
}

export default class Resource$VideoSecondaryResultDetails {

    static parse(data: Map$Video, client: YouTubeClient, context: YouTubeContext): Schema$VideoSecondaryResultDetails {
        let VideoSecondaryResultDetails: Schema$VideoSecondaryResultDetails = {
            continue: async () => { return undefined }
        };

        VideoSecondaryResultDetails['results'] = data.secondaryResults?.flatMap((renderer: any) => {
            if (!renderer['continuationItemRenderer']) {
                const result = Resource$CompactRenderer.parse(renderer, client, context);
                if (result) {
                    return result;
                } return [];
            } else {
                return [];
            }
        });

        const token = data?.secondaryResults?.findLast((item: any) => item?.continuationItemRenderer)?.continuationItemRenderer.continuationEndpoint.continuationCommand.token
        
        if (token) {
            VideoSecondaryResultDetails['continue'] = async () => {
                const continuationContext = {
                    ...context,
                    referer: `https://www.youtube.com/${context.currentUrl}`
                }
                const continuationBody = JSON.stringify(new Body$Continuation({ continuation: token }, client.config));
                const continuationResponse = await Endpoint$Next.post(continuationBody, client, continuationContext);
                const items = continuationResponse.onResponseReceivedEndpoints[0].appendContinuationItemsAction.continuationItems
                return Resource$VideoSecondaryResultDetails.parse({secondaryResults: items}, client, context);
            }
        }

        return VideoSecondaryResultDetails;
    }
}  