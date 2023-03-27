import { RequestFactory } from "../../requests/RequestFactory.js";
import { Parser } from "../Parser.js";
import { Thumbnail, ThumbnailParser } from "../util/Thumbnail.js";
import { VideoCategoryId, videoCategoryMap } from "../util/VideoCategoryMap.js";
import { VideoPartsMap } from "./VideoPartsParser.js";


export interface VideoSnippet {
    publishedAt?: string;
    channelId?: string;
    title?: string;
    description?: string;
    thumbnails?: Thumbnail[];
    channelTitle?: string;
    tags?: string[];
    categoryId?: VideoCategoryId;
    isUpcoming?: boolean;
    isLive?: boolean;
    liveContentType?: "premiere" | "stream";
}


export class VideoSnippetParser extends Parser {
    private thumbnailParser = new ThumbnailParser()


    protected extract(next: any, player: any, requestFactory: RequestFactory, map: VideoPartsMap): VideoSnippet {
        let liveContentType: "premiere" | "stream" | undefined = undefined;

        if (map.microformat?.liveBroadcastDetails) {
            if (map.videoDetails.isLiveContent === false) {
                liveContentType = "premiere"
            } else {
                liveContentType = "stream"
            }
        }

        return {
            publishedAt: map.microformat?.publishDate,
            channelId: map.videoDetails?.channelId,
            title: map.videoDetails?.title,
            description: map.videoDetails?.shortDescription,
            thumbnails: this.thumbnailParser.parse(next, player, requestFactory, map.videoDetails?.thumbnail?.thumbnails),
            channelTitle: map.videoDetails?.author,
            tags: map.videoDetails?.keywords,
            categoryId: videoCategoryMap.categorytoCategoryId(map.microformat?.category),
            isUpcoming: map.videoDetails?.isUpcoming,
            isLive: map.videoDetails?.isLive,
            liveContentType: liveContentType
        }
    }
}


