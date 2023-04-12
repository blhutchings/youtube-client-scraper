import { getChannelHandle } from "../../util/ParserUtils.js";
import { Map$Video } from "./Video.js";
import Resource$VideoPlaylistResult, { Schema$VideoPlaylistResult } from "./VideoPlaylistResult.js";

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

    results?: Schema$VideoPlaylistResult[]
}

export default class Resource$VideoPlaylistDetails {
    
    static parse(data: Map$Video): Schema$VideoPlaylistDetails {
        let VideoPlaylistDetails: Schema$VideoPlaylistDetails = {};

        VideoPlaylistDetails['title'] = data.playlist?.title;
        VideoPlaylistDetails['playlistId'] = data.playlist?.playlistId;
        VideoPlaylistDetails['videoCount'] = data.playlist?.totalVideos;
        VideoPlaylistDetails['playlistShareUrl'] = data.playlist?.playlistShareUrl;
        VideoPlaylistDetails['isInfinite'] = data.playlist?.isInfinite;
        VideoPlaylistDetails['isCourse'] = data.playlist?.isCourse;

        const browseEndpoint = data.playlist?.shortBylineText?.runs?.[0]?.navigationEndpoint?.browseEndpoint;
        VideoPlaylistDetails['channelTitle'] = data.playlist?.ownerName?.simpleText;
        VideoPlaylistDetails['channelId'] = browseEndpoint?.browseId;
        VideoPlaylistDetails['channelHandle'] = getChannelHandle(browseEndpoint?.canonicalBaseUrl);
        VideoPlaylistDetails['channelBadge'] = data.playlist?.ownerBadges?.[0]?.metadataBadgeRenderer?.tooltip;

        VideoPlaylistDetails['results'] = data?.playlist?.contents?.map((item: any) => Resource$VideoPlaylistResult.parse(item?.playlistPanelVideoRenderer))

        return VideoPlaylistDetails;
    }
}
