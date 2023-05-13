import Resource$VideoLiveStreamingDetails from "./VideoLiveStreamingDetails.js";
import Resource$VideoMetadata from "./VideoMetadata.js";
import Resource$VideoPlayability from "./VideoPlayability.js";
import Resource$VideoPlaylistDetails from "./VideoPlaylistDetails.js";
import Resource$VideoSecondaryResultDetails from "./VideoSecondaryResultDetails.js";
import Resource$VideoSnippet from "./VideoSnippet.js";
import Resource$VideoStatistics from "./VideoStatistics.js";
export default class Resource$Video {
    static parse(data, client, context) {
        if (data?.next === undefined && data?.player === undefined)
            return {};
        let Video = {};
        const map = Resource$Video.map(data);
        Video['id'] = map?.videoDetails?.videoId;
        Video['playability'] = Resource$VideoPlayability.parse(data, client, context);
        Video['snippet'] = Resource$VideoSnippet.parse(map);
        Video['statistics'] = Resource$VideoStatistics.parse(map);
        Video['liveStreamingDetails'] = Resource$VideoLiveStreamingDetails.parse(map);
        Video['metadata'] = Resource$VideoMetadata.parse(map);
        Video['playlistDetails'] = Resource$VideoPlaylistDetails.parse(map);
        Video['secondaryResults'] = Resource$VideoSecondaryResultDetails.parse(map, client, context);
        return Video;
    }
    static map(data) {
        const next = data?.next;
        const player = data?.player;
        const contents = next?.contents?.twoColumnWatchNextResults;
        let results = contents?.results?.results?.contents;
        const videoPrimaryInfoRenderer = results?.find((p) => p?.videoPrimaryInfoRenderer)?.videoPrimaryInfoRenderer;
        const videoSecondaryInfoRenderer = results?.find((p) => p?.videoSecondaryInfoRenderer)?.videoSecondaryInfoRenderer;
        const commentsEntryPoint = results?.find((p) => p?.itemSectionRenderer?.sectionIdentifier === "comments-entry-point")?.itemSectionRenderer?.contents;
        const commentsSection = results?.find((p) => p?.itemSectionRenderer?.sectionIdentifier === "comment-item-section")?.itemSectionRenderer?.contents;
        const secondaryResults = contents?.secondaryResults?.secondaryResults?.results;
        const playlist = contents?.playlist?.playlist;
        const videoDetails = player?.videoDetails;
        const metadataRowContainer = videoSecondaryInfoRenderer?.metadataRowContainer?.metadataRowContainerRenderer;
        let microformatLive = player?.microformat?.playerMicroformatRenderer;
        let microformatUpcoming = player?.microformat?.microformatDataRenderer;
        const microformat = [microformatLive, microformatUpcoming].find(v => v);
        const startTime = microformat?.playerMicroformatRenderer?.liveBroadcastDetails?.startTimestamp;
        return {
            contents: contents,
            videoPrimaryInfoRenderer: videoPrimaryInfoRenderer,
            videoSecondaryInfoRenderer: videoSecondaryInfoRenderer,
            commentsEntryPoint: commentsEntryPoint,
            commentsSection: commentsSection,
            playlist: playlist,
            secondaryResults: secondaryResults,
            videoDetails: videoDetails,
            metadataRowContainer: metadataRowContainer,
            microformat: microformat,
            startTime: startTime
        };
    }
}
