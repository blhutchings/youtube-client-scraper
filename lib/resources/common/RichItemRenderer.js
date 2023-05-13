import { getChannelHandle, getFirstNumberInRuns, getNumber, hmsToSeconds } from "../../util/ParserUtils.js";
import { Resource$ThumbnailDetails } from "./ThumbnailDetails.js";
export default class Resource$RichItemRenderer {
    static parse(videoRenderer, channelTab) {
        let RichItemRenderer = {};
        RichItemRenderer['videoId'] = videoRenderer.videoId;
        RichItemRenderer['title'] = videoRenderer.title.runs[0].text;
        RichItemRenderer['thumbnails'] = Resource$ThumbnailDetails.parse(videoRenderer.thumbnail.thumbnails) || videoRenderer.thumbnail.thumbnails;
        RichItemRenderer['publishedTimeText'] = videoRenderer.publishedTimeText?.simpleText;
        RichItemRenderer['viewCount'] = getNumber(videoRenderer.viewCountText?.simpleText);
        RichItemRenderer['channelTitle'] = videoRenderer.shortBylineText?.runs[0].text;
        RichItemRenderer['channelId'] = videoRenderer.shortBylineText?.runs[0].navigationEndpoint.browseEndpoint.browseId;
        RichItemRenderer['channelHandle'] = getChannelHandle(videoRenderer.shortBylineText?.runs[0].navigationEndpoint.browseEndpoint.canonicalBaseUrl);
        RichItemRenderer['ownerBadge'] = videoRenderer.ownerBadges?.[0].metadataBadgeRenderer.tooltip;
        RichItemRenderer['concurrentViewers'] = getFirstNumberInRuns(videoRenderer.viewCountText?.runs);
        RichItemRenderer['length'] = hmsToSeconds(videoRenderer.lengthText?.simpleText);
        4;
        RichItemRenderer['isUpcoming'] = videoRenderer.upcomingEventData ? true : undefined;
        if (videoRenderer.thumbnailOverlays.some((overlay) => overlay.thumbnailOverlayTimeStatusRenderer?.style === "LIVE") ||
            videoRenderer.badge?.some((badge) => badge.metadataBadgeRenderer.label === "LIVE")) {
            RichItemRenderer['isLive'] = true;
        }
        const wasStreamed = videoRenderer.publishedTimeText?.simpleText.includes("Streamed");
        if (wasStreamed) {
            RichItemRenderer['isLive'] = false;
        }
        ;
        RichItemRenderer['startTime'] = getNumber(videoRenderer.upcomingEventData?.startTime);
        if (channelTab === 'live') {
            RichItemRenderer['liveContentType'] = "stream";
        }
        else if (RichItemRenderer['isUpcoming'] || RichItemRenderer['isLive']) {
            RichItemRenderer['liveContentType'] = "premiere";
        }
        return RichItemRenderer;
    }
}
