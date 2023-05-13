import { getChannelHandle } from "../../util/ParserUtils.js";
import Resource$VideoPlaylistResult from "./VideoPlaylistResult.js";
export default class Resource$VideoPlaylistDetails {
    static parse(data) {
        let VideoPlaylistDetails = {};
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
        VideoPlaylistDetails['results'] = data?.playlist?.contents?.map((item) => Resource$VideoPlaylistResult.parse(item?.playlistPanelVideoRenderer));
        return VideoPlaylistDetails;
    }
}
