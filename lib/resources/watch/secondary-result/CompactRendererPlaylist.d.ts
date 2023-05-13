import { Schema$Thumbnail } from "../../common/ThumbnailDetails.js";
import { Schema$CompactRenderer } from "./CompactRenderer.js";
export interface Schema$CompactRendererPlaylist extends Schema$CompactRenderer {
    type: "playlist";
    playlistId?: string;
    index?: string;
    videoCount?: number;
    sidebarThumbnails?: Schema$Thumbnail[];
    topStandaloneBadge?: string;
    shareUrl?: string;
    isCourse?: boolean;
    isInfinite?: boolean;
}
export default class Resource$CompactRendererPlaylist {
    static parse(compactPlaylistOrRadioRenderer: any, CompactRenderer: Schema$CompactRenderer): Schema$CompactRendererPlaylist;
}
