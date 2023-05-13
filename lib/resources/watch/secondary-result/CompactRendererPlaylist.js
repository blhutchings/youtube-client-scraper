import { Resource$ThumbnailDetails } from "../../common/ThumbnailDetails.js";
import { getNumber } from "../../../util/ParserUtils.js";
export default class Resource$CompactRendererPlaylist {
    static parse(compactPlaylistOrRadioRenderer, CompactRenderer) {
        let CompactPlaylistRenderer = {
            ...CompactRenderer,
            type: "playlist"
        };
        const key = Object.keys(compactPlaylistOrRadioRenderer)[0];
        const renderer = compactPlaylistOrRadioRenderer[key];
        CompactPlaylistRenderer['playlistId'] = renderer?.playlistId;
        CompactPlaylistRenderer['videoCount'] = getNumber(renderer?.videoCountShortText?.simpleText);
        CompactPlaylistRenderer['sidebarThumbnails'] = renderer?.sidebarThumbnails?.map((item) => Resource$ThumbnailDetails.parse(item?.thumbnails));
        CompactPlaylistRenderer['shareUrl'] = renderer?.shareUrl;
        CompactPlaylistRenderer['isCourse'] = renderer?.thumbnailOverlays?.find((item) => item?.thumbnailOverlayBottomPanelRenderer?.text?.simpleText);
        if (key === "compactRadioRenderer") {
            CompactPlaylistRenderer['isInfinite'] = true;
        }
        return CompactPlaylistRenderer;
    }
}
