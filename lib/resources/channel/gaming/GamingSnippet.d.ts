import { Schema$Thumbnail } from "../../common/ThumbnailDetails.js";
import { Map$Gaming } from "./Gaming.js";
export interface Schema$GamingSnippet {
    title?: string;
    thumbnail?: Schema$Thumbnail[];
    subscriberCountText?: string;
    channelHandle?: string;
}
export declare class Resource$GamingSnippet {
    static parse(data: Map$Gaming): Schema$GamingSnippet;
}
