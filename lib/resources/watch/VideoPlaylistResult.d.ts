import { Schema$ThumbnailDetails } from "../common/ThumbnailDetails.js";
export interface Schema$VideoPlaylistResult {
    selected?: boolean;
    videoId?: string;
    title?: string;
    thumbnails?: Schema$ThumbnailDetails;
    length?: number;
    channelTitle?: string;
    channelId?: string;
    channelBadge?: string;
    channelHandle?: string;
}
export default class Resource$VideoPlaylistResult {
    static parse(playlistPanelVideoRenderer: any): Schema$VideoPlaylistResult;
}
