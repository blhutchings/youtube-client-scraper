import YouTubeClient from "../../clients/YouTubeClient.js";
import YouTubeContext from "../../YouTubeContext.js";
import { Body$Continuation } from "../../requests/Continuation.js";
import Endpoint$Search from "../../requests/base-requests/Endpoint$Search.js";
import Resource$RichItemRenderer, { Schema$RichItemRenderer } from "../common/RichItemRenderer.js";

export interface Schema$SearchResults {
	videos?: Schema$RichItemRenderer[];
	continue: () => Promise<Schema$SearchResults | undefined>;
}

export class Resource$SearchResults {
	static parse(contents: Record<string, any>, client: YouTubeClient, context: YouTubeContext) {
		let SearchResults: Schema$SearchResults = {
			continue: async () => { return undefined }
		};

		SearchResults['videos'] = contents[0].itemSectionRenderer.contents.filter((renderer: any) => 'videoRenderer' in renderer).map((renderer: any) => Resource$RichItemRenderer.parse(renderer.videoRenderer))
		
		const token = contents?.findLast((item: any) => item?.continuationItemRenderer)?.continuationItemRenderer.continuationEndpoint.continuationCommand.token
        if (token) {
            SearchResults['continue'] = async () => {
                const continuationContext = {
                    ...context,
                    referer: `https://www.youtube.com/${context.currentUrl}`
                }
    
                const continuationBody = JSON.stringify(new Body$Continuation({ continuation: token }, client.config));
                const continuationResponse = await Endpoint$Search.post(continuationBody, client, continuationContext);
                const items = continuationResponse.onResponseReceivedActions[0].appendContinuationItemsAction.continuationItems
                return Resource$SearchResults.parse(items, client, context)
            }
        }
		return SearchResults;
	}
}
