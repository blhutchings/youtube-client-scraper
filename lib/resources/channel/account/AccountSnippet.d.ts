import { Schema$Thumbnail } from "../../common/ThumbnailDetails.js";
import { Map$Account } from "./Account.js";
export interface Schema$AccountSnippet {
    title?: string;
    description?: string;
    thumbnail?: Schema$Thumbnail;
    subscriberCountText?: string;
    videoCount?: number;
    channelHandle?: string;
    tags?: string[];
    banner?: Schema$Thumbnail;
    headerLinks?: {
        title?: string;
        url?: string;
        icon?: string;
    }[];
}
export default class Resource$AccountSnippet {
    static parse(data: Map$Account): Schema$AccountSnippet;
}
