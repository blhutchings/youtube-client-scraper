import YouTubeClient from "../../YouTubeClient.js";
import YouTubeContext from "../../YouTubeContext.js";
import Resource$VideoLiveStreamingDetails, { Schema$VideoLiveStreamingDetails } from "./VideoLiveStreamingDetails.js";
import Resource$VideoMetadata, { Schema$VideoMetadata } from "./VideoMetadata.js";
import Resource$VideoPlayability, { Schema$VideoPlayability } from "./VideoPlayability.js";
import Resource$VideoPlaylistDetails, { Schema$VideoPlaylistDetails } from "./VideoPlaylistDetails.js";
import Resource$VideoSecondaryResultDetails, { Schema$VideoSecondaryResultDetails } from "./VideoSecondaryResultDetails.js";
import Resource$VideoSnippet, { Schema$VideoSnippet } from "./VideoSnippet.js";
import Resource$VideoStatistics, { Schema$VideoStatistics } from "./VideoStatistics.js";

export interface Schema$Video {
    id?: string;
    playability?: Schema$VideoPlayability;
    snippet?: Schema$VideoSnippet;
    statistics?: Schema$VideoStatistics;
    liveStreamingDetails?: Schema$VideoLiveStreamingDetails;
    metadata?: Schema$VideoMetadata;
    playlistDetails?: Schema$VideoPlaylistDetails;
    secondaryResults?: Schema$VideoSecondaryResultDetails;
}

export interface Data$Video {
    next?: { [key: string]: any },
    player?: { [key: string]: any }
}

export type Map$Video = {
    contents?: any,
    videoPrimaryInfoRenderer?: any,
    videoSecondaryInfoRenderer?: any,
    commentsEntryPoint?: any,
    commentsSection?: any,
    secondaryResults?: any[],
    playlist?: any,
    videoDetails?: any,
    metadataRowContainer?: any,
    microformat?: any,
    startTime?: any,
}

export default class Resource$Video {

    static parse(data: Data$Video, client: YouTubeClient, context: YouTubeContext): Schema$Video {
        // Base case for VideoPlayability.trailer
        if (data?.next === undefined && data?.player === undefined) return {};
        
        let Video: Schema$Video = {};
        const map = Resource$Video.map(data);

        Video['id'] = map?.videoDetails?.videoId;
        Video['playability'] = Resource$VideoPlayability.parse(data, client, context);
        Video['snippet'] = Resource$VideoSnippet.parse(map);
        Video['statistics'] = Resource$VideoStatistics.parse(map);
        Video['liveStreamingDetails'] = Resource$VideoLiveStreamingDetails.parse(map);
        Video['metadata'] = Resource$VideoMetadata.parse(map);
        Video['playlistDetails'] = Resource$VideoPlaylistDetails.parse(map)
        Video['secondaryResults'] = Resource$VideoSecondaryResultDetails.parse(map, client, context)
        // Video['comments'] = 
        return Video
    }

    private static map(data: Data$Video): Map$Video {
        const next = data?.next;
        const player = data?.player;

        const contents = next?.contents?.twoColumnWatchNextResults

        let results = contents?.results?.results?.contents

        const videoPrimaryInfoRenderer = results?.find((p: any) => p?.videoPrimaryInfoRenderer)?.videoPrimaryInfoRenderer
        const videoSecondaryInfoRenderer = results?.find((p: any) => p?.videoSecondaryInfoRenderer)?.videoSecondaryInfoRenderer
        const commentsEntryPoint = results?.find((p: any) => p?.itemSectionRenderer?.sectionIdentifier === "comments-entry-point")?.itemSectionRenderer?.contents
        const commentsSection = results?.find((p: any) => p?.itemSectionRenderer?.sectionIdentifier === "comment-item-section")?.itemSectionRenderer?.contents

        const secondaryResults = contents?.secondaryResults?.secondaryResults?.results
        const playlist = contents?.playlist?.playlist
        const videoDetails = player?.videoDetails
        const metadataRowContainer = videoSecondaryInfoRenderer?.metadataRowContainer?.metadataRowContainerRenderer

        let microformatLive = player?.microformat?.playerMicroformatRenderer
        let microformatUpcoming = player?.microformat?.microformatDataRenderer

        const microformat = [microformatLive, microformatUpcoming].find(v => v);

        const startTime = microformat?.playerMicroformatRenderer?.liveBroadcastDetails?.startTimestamp

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
        }
    }
}
