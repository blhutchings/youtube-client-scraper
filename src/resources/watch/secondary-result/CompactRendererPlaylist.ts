import { Schema$Thumbnail, Resource$ThumbnailDetails } from "../../common/ThumbnailDetails.js";
import { getNumber } from "../../../util/ParserUtils.js";
import { Schema$CompactRenderer } from "./CompactRenderer.js";

export interface Schema$CompactRendererPlaylist extends Schema$CompactRenderer {
    type: "playlist";
    playlistId?: string,
    index?: string,
    videoCount?: number,
    sidebarThumbnails?: Schema$Thumbnail[],
    topStandaloneBadge?: string;
    shareUrl?: string,
    isCourse?: boolean,
    isInfinite?: boolean
}

export default class Resource$CompactRendererPlaylist {
    static parse(compactPlaylistOrRadioRenderer: any, CompactRenderer: Schema$CompactRenderer): Schema$CompactRendererPlaylist{
        let CompactPlaylistRenderer: Schema$CompactRendererPlaylist = {
            ...CompactRenderer,
            type: "playlist"
        }
        const key = Object.keys(compactPlaylistOrRadioRenderer)[0];
        const renderer = compactPlaylistOrRadioRenderer[key];

        CompactPlaylistRenderer['playlistId'] = renderer?.playlistId;
        CompactPlaylistRenderer['videoCount'] = getNumber(renderer?.videoCountShortText?.simpleText);
        CompactPlaylistRenderer['sidebarThumbnails'] = renderer?.sidebarThumbnails?.map((item: any) => Resource$ThumbnailDetails.parse(item?.thumbnails));
        CompactPlaylistRenderer['shareUrl'] = renderer?.shareUrl;
        CompactPlaylistRenderer['isCourse'] = renderer?.thumbnailOverlays?.find((item: any) => item?.thumbnailOverlayBottomPanelRenderer?.text?.simpleText);
        if (key === "compactRadioRenderer") {
            CompactPlaylistRenderer['isInfinite'] = true;
        }

        return CompactPlaylistRenderer;
    }
}