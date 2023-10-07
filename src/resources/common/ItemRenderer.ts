import { VocabularyMap } from "../../VocabularyMap.js";
import { getChannelHandle, getFirstNumberInRuns, getNumber, hmsToSeconds } from "../../util/ParserUtils.js";
import { Resource$ThumbnailDetails, Schema$ThumbnailDetails } from "./ThumbnailDetails.js";


export interface Schema$ItemRenderer {
    videoId?: string;
    title?: string;
    thumbnails?: Schema$ThumbnailDetails;
    publishedTimeText?: string;
    viewCount?: number;

    channelTitle?: string
    ownerBadge?: string;
    channelId?: string;
    channelHandle?: string;
    length?: number;

	liveContentType?: "premiere" | "stream";
	concurrentViewers?: number;
    isUpcoming?: boolean;
    isLive?: boolean;
    startTime?: number;
}

export default class Resource$ItemRenderer {

    // Need to specifiy what tab as alone you can't tell the difference between an upcoming premiere and upcoming stream 
    static parse(videoRenderer: any): Schema$ItemRenderer {
        let ItemRenderer: Schema$ItemRenderer = {};

        ItemRenderer['videoId'] = videoRenderer.videoId;
        ItemRenderer['title'] = videoRenderer.title.runs[0].text;
        ItemRenderer['thumbnails'] = Resource$ThumbnailDetails.parse(videoRenderer.thumbnail.thumbnails) || videoRenderer.thumbnail.thumbnails
        ItemRenderer['publishedTimeText'] = videoRenderer.publishedTimeText?.simpleText;
        ItemRenderer['viewCount'] = getNumber(videoRenderer.viewCountText?.simpleText);

        ItemRenderer['channelTitle'] = videoRenderer.shortBylineText?.runs[0].text;
        ItemRenderer['channelId'] = videoRenderer.shortBylineText?.runs[0].navigationEndpoint.browseEndpoint.browseId;
        ItemRenderer['channelHandle'] = getChannelHandle(videoRenderer.shortBylineText?.runs[0].navigationEndpoint.browseEndpoint.canonicalBaseUrl);
        ItemRenderer['ownerBadge'] = videoRenderer.ownerBadges?.[0].metadataBadgeRenderer.tooltip

        ItemRenderer['concurrentViewers'] = getFirstNumberInRuns(videoRenderer.shortViewCountText.runs[0].text);
        
        ItemRenderer['isUpcoming'] = videoRenderer.upcomingEventData ? true : undefined;

		const thumbnailOverlayTimeStatusRenderer = videoRenderer.thumbnailOverlays.some((overlay: any) => overlay.thumbnailOverlayTimeStatusRenderer?.style)

		if (videoRenderer.publishedTimeText?.simpleText.includes(VocabularyMap.STREAMED)) {
			ItemRenderer['liveContentType'] = "stream"
		} else if (videoRenderer.publishedTimeText?.simpleText.includes(VocabularyMap.PREMIERES)) {
			ItemRenderer['liveContentType'] = "premiere"
		} else {
			ItemRenderer['liveContentType']  = undefined
		}

		if (thumbnailOverlayTimeStatusRenderer === "DEFAULT") {
			ItemRenderer['length'] = hmsToSeconds(thumbnailOverlayTimeStatusRenderer.text.simpleText); 
		} else if (thumbnailOverlayTimeStatusRenderer === "LIVE") {
			ItemRenderer['startTime'] = getNumber(videoRenderer.upcomingEventData?.startTime);
			ItemRenderer['isLive'] = true
			ItemRenderer['isUpcoming'] = false
		} else if (thumbnailOverlayTimeStatusRenderer === "UPCOMING") {
			ItemRenderer['startTime'] = getNumber(videoRenderer.upcomingEventData?.startTime);
			ItemRenderer['isLive'] = false
			ItemRenderer['isUpcoming'] = true
		} else {
			console.error(`Resource$ItemRenderer - Unknown thumbnailOverlayTimeStatusRenderer - ${thumbnailOverlayTimeStatusRenderer}`)
		}
		
        
        return ItemRenderer;
    }
}

