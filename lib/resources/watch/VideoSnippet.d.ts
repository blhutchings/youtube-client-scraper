import { Schema$ThumbnailDetails } from "../common/ThumbnailDetails.js";
import { VideoCategoryId } from "../../util/VideoCategoryMap.js";
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
    static parse(data: Map$Video): Schema$VideoSnippet;
}
