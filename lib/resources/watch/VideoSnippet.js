import { Resource$ThumbnailDetails } from "../common/ThumbnailDetails.js";
import { videoCategoryMap } from "../../util/VideoCategoryMap.js";
export default class Resource$VideoSnippet {
    static parse(data) {
        let VideoSnippet = {};
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
            }
            else {
                VideoSnippet['liveContentType'] = "stream";
            }
        }
        return VideoSnippet;
    }
}
