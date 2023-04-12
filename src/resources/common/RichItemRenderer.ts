import { getChannelHandle, getFirstNumberInRuns, getNumber, hmsToSeconds } from "../../util/ParserUtils.js";
import { Resource$ThumbnailDetails, Schema$ThumbnailDetails } from "./ThumbnailDetails.js";


export interface Schema$RichItemRenderer {
    videoId?: string;
    title?: string;
    thumbnails?: Schema$ThumbnailDetails;
    publishedTimeText?: string;
    viewCount?: number;

    channelTitle?: string
    ownerBadge?: string;
    channelId?: string;
    channelHandle?: string;

    concurrentViewers?: number;
    length?: number;
    isUpcoming?: boolean;
    isLive?: boolean;
    startTime?: number;
    liveContentType?: "premiere" | "stream";
}

export default class Resource$RichItemRenderer {
    // Need to specifiy what tab as alone you can't tell the difference between an upcoming premiere and upcoming stream 
    static parse(videoRenderer: any, channelTab?: string): Schema$RichItemRenderer {
        let RichItemRenderer: Schema$RichItemRenderer = {};

        RichItemRenderer['videoId'] = videoRenderer.videoId;
        RichItemRenderer['title'] = videoRenderer.title.runs[0].text;
        RichItemRenderer['thumbnails'] = Resource$ThumbnailDetails.parse(videoRenderer.thumbnail.thumbnails) || videoRenderer.thumbnail.thumbnails
        RichItemRenderer['publishedTimeText'] = videoRenderer.publishedTimeText?.simpleText;
        RichItemRenderer['viewCount'] = getNumber(videoRenderer.viewCountText?.simpleText);

        RichItemRenderer['channelTitle'] = videoRenderer.shortBylineText?.runs[0].text;
        RichItemRenderer['channelId'] = videoRenderer.shortBylineText?.runs[0].navigationEndpoint.browseEndpoint.browseId;
        RichItemRenderer['channelHandle'] = getChannelHandle(videoRenderer.shortBylineText?.runs[0].navigationEndpoint.browseEndpoint.canonicalBaseUrl);
        RichItemRenderer['ownerBadge'] = videoRenderer.ownerBadges?.[0].metadataBadgeRenderer.tooltip

        RichItemRenderer['concurrentViewers'] = getFirstNumberInRuns(videoRenderer.viewCountText?.runs);
        RichItemRenderer['length'] = hmsToSeconds(videoRenderer.lengthText?.simpleText); 4
        RichItemRenderer['isUpcoming'] = videoRenderer.upcomingEventData ? true : undefined;

        if (videoRenderer.thumbnailOverlays.some((overlay: any) => overlay.thumbnailOverlayTimeStatusRenderer?.style === "LIVE") || // Account
            videoRenderer.badge?.some((badge: any) => badge.metadataBadgeRenderer.label === "LIVE")) { // Game
            RichItemRenderer['isLive'] = true;
        }
        // Need to check if premiere 
        

        const wasStreamed = videoRenderer.publishedTimeText?.simpleText.includes("Streamed");
        if (wasStreamed) {
            RichItemRenderer['isLive'] = false;
        };
        RichItemRenderer['startTime'] = getNumber(videoRenderer.upcomingEventData?.startTime);
        // If the tab is live, everything is a stream
        if (channelTab === 'live') {
            RichItemRenderer['liveContentType'] = "stream"
            // If not, it must be a premiere if the content is live
        } else if (RichItemRenderer['isUpcoming'] || RichItemRenderer['isLive']) {
            RichItemRenderer['liveContentType'] = "premiere"
        }
        return RichItemRenderer;
    }
}