import YouTubeClient from "../../../clients/YouTubeClient.js";
import YouTubeContext from "../../../YouTubeContext.js";
import { Resource$ThumbnailDetails, Schema$Thumbnail } from "../../common/ThumbnailDetails.js";
export interface Schema$CompactRenderer {
    type?: string;
    videoId?: string;
    title?: string;
    thumbnails?: Resource$ThumbnailDetails;
    publishedTimeText?: string;
    viewCount?: number;
    length?: number;
    badges?: string[];
    channelTitle?: string;
    channelThumbnail?: Schema$Thumbnail;
    ownerBadge?: string;
    channelId?: string;
    channelHandle?: string;
}
export default class Resource$CompactRenderer {
    static parse(compactUnknownRenderer: any, client: YouTubeClient, context: YouTubeContext): import("./CompactRendererMovie.js").Schema$CompactRendererMovie | import("./CompactRendererPlaylist.js").Schema$CompactRendererPlaylist | import("./CompactRendererVideo.js").Schema$CompactRendererVideo | undefined;
}
