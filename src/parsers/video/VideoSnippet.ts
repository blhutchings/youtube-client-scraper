import { Thumbnails } from "../util/Thumbnail.js";
import { VideoCategoryId, videoCategoryMap } from "../util/VideoCategoryMap.js";
import { VideoPartsMap } from "./VideoParts.js";

export default class VideoSnippet {
    publishedAt?: string;
    channelId?: string;
    title?: string;
    description?: string;
    thumbnails?: Thumbnails;
    channelTitle?: string;
    tags?: string[];
    categoryId?: VideoCategoryId;
    isUpcoming?: boolean;
    isLive?: boolean;
    liveContentType?: "premiere" | "stream";

    constructor(data: VideoPartsMap) {
        let liveContentType: "premiere" | "stream" | undefined = undefined;

        if (data.microformat?.liveBroadcastDetails) {
            if (data.videoDetails.isLiveContent === false) {
                liveContentType = "premiere";
            } else {
                liveContentType = "stream";
            }
        }

        this.publishedAt = data.microformat?.publishDate;
        this.channelId = data.videoDetails?.channelId;
        this.title = data.videoDetails?.title;
        this.description = data.videoDetails?.shortDescription;
        this.thumbnails = new Thumbnails(data.videoDetails?.thumbnail?.thumbnails);
        this.channelTitle = data.videoDetails?.author;
        this.tags = data.videoDetails?.keywords;
        this.categoryId = videoCategoryMap.categorytoCategoryId(data.microformat?.category);
        this.isUpcoming = data.videoDetails?.isUpcoming;
        this.isLive = data.videoDetails?.isLive;
        this.liveContentType = liveContentType;
    }
}


