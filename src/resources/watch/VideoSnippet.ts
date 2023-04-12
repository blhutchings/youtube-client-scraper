import { Schema$ThumbnailDetails, Resource$ThumbnailDetails } from "../common/ThumbnailDetails.js";
import { VideoCategoryId, videoCategoryMap } from "../../util/VideoCategoryMap.js";
import { Map$Video } from "./Video.js";

export interface Schema$VideoSnippet {
    publishedAt?: string;
    title?: string;
    description?: string;
    thumbnails?: Schema$ThumbnailDetails;
    channelId?: string;
    channelTitle?: string;
    tags?: string[];
    categoryId?: VideoCategoryId;
    isUpcoming?: boolean;
    isLive?: boolean;
    liveContentType?: "stream" | "premiere";
}

export default class Resource$VideoSnippet {
    
    static parse(data: Map$Video): Schema$VideoSnippet {
        let VideoSnippet: Schema$VideoSnippet = {};

        VideoSnippet['publishedAt'] = data.microformat?.publishDate;
        VideoSnippet['title'] = data.videoDetails?.title;
        VideoSnippet['description'] = data.videoDetails?.shortDescription;
        VideoSnippet['thumbnails'] = Resource$ThumbnailDetails.parse(data.videoDetails?.thumbnail?.thumbnails);
        VideoSnippet['channelId'] = data.videoDetails?.channelId;
        VideoSnippet['channelTitle'] = data.videoDetails?.author;
        VideoSnippet['tags'] = data.videoDetails?.keywords;
        VideoSnippet['categoryId'] = videoCategoryMap.categorytoCategoryId(data.microformat?.category);
        VideoSnippet['isUpcoming'] = data.videoDetails?.isUpcoming;
        VideoSnippet['isLive'] = data.videoDetails?.isLive;

        if (data.microformat?.liveBroadcastDetails) {
            if (data.videoDetails.isLiveContent === false) {
                VideoSnippet['liveContentType'] = "premiere";
            } else {
                VideoSnippet['liveContentType'] = "stream";
            }
        }
        
        return VideoSnippet;
    }
}


