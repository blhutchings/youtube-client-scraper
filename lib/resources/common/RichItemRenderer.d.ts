import { Schema$ThumbnailDetails } from "./ThumbnailDetails.js";
export interface Schema$RichItemRenderer {
    videoId?: string;
    title?: string;
    thumbnails?: Schema$ThumbnailDetails;
    publishedTimeText?: string;
    viewCount?: number;
    channelTitle?: string;
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
    static parse(videoRenderer: any, channelTab?: string): Schema$RichItemRenderer;
}
