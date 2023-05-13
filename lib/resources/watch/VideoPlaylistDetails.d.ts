import { Map$Video } from "./Video.js";
import { Schema$VideoPlaylistResult } from "./VideoPlaylistResult.js";
export interface Schema$VideoPlaylistDetails {
    title?: string;
    currentIndex?: number;
    playlistId?: string;
    videoCount?: number;
    playlistShareUrl?: string;
    isInfinite?: boolean;
    isCourse?: boolean;
    channelTitle?: string;
    channelId?: string;
    channelBadge?: string;
    channelHandle?: string;
    results?: Schema$VideoPlaylistResult[];
}
export default class Resource$VideoPlaylistDetails {
    static parse(data: Map$Video): Schema$VideoPlaylistDetails;
}
