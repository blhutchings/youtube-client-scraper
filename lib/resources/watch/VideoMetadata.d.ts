import { Schema$Thumbnail } from "../common/ThumbnailDetails.js";
import { Map$Video } from "./Video.js";
export interface Schema$VideoMetadata {
    channelHandle?: string;
    channelBadge?: string;
    subscriberCountText?: string;
    allowRatings?: boolean;
    game?: {
        title?: string;
        release?: string;
        boxArt?: Schema$Thumbnail[];
        id?: string;
    };
    topic?: {
        title?: string;
        art?: Schema$Thumbnail[];
        id?: string;
    };
}
export interface Map$VideoMetadata extends Map$Video {
    richMetadataRowRenderer?: any;
    badges?: any[];
}
export default class Resource$VideoMetadata {
    static parse(data: Map$Video): Schema$VideoMetadata;
    private static map;
}
