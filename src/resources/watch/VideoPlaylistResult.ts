import { getChannelHandle, hmsToSeconds } from "../../util/ParserUtils.js";
import { Schema$ThumbnailDetails, Resource$ThumbnailDetails } from "../common/ThumbnailDetails.js";

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

    static parse(playlistPanelVideoRenderer: any) {
        let VideoPlaylistResult: Schema$VideoPlaylistResult = {};

        VideoPlaylistResult['selected'] = playlistPanelVideoRenderer?.selected
        VideoPlaylistResult['videoId'] = playlistPanelVideoRenderer?.videoId
        VideoPlaylistResult['title'] = playlistPanelVideoRenderer?.title?.simpleText
        VideoPlaylistResult['thumbnails'] = Resource$ThumbnailDetails.parse(playlistPanelVideoRenderer?.thumbnail?.thumbnails)
        VideoPlaylistResult['length'] = hmsToSeconds(playlistPanelVideoRenderer?.lengthText?.simpleText)

        const channel = playlistPanelVideoRenderer?.shortBylineText?.[0]
        VideoPlaylistResult['channelTitle'] = channel?.text
        VideoPlaylistResult['channelId'] = channel?.browseEndpoint?.browseId
        VideoPlaylistResult['channelHandle'] = getChannelHandle(channel?.browseEndpoint?.canonicalBaseUrl);
        return VideoPlaylistResult;
    }
}