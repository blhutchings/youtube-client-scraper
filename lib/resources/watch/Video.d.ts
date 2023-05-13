import YouTubeClient from "../../clients/YouTubeClient.js";
import YouTubeContext from "../../YouTubeContext.js";
import { Schema$VideoLiveStreamingDetails } from "./VideoLiveStreamingDetails.js";
import { Schema$VideoMetadata } from "./VideoMetadata.js";
import { Schema$VideoPlayability } from "./VideoPlayability.js";
import { Schema$VideoPlaylistDetails } from "./VideoPlaylistDetails.js";
import { Schema$VideoSecondaryResultDetails } from "./VideoSecondaryResultDetails.js";
import { Schema$VideoSnippet } from "./VideoSnippet.js";
import { Schema$VideoStatistics } from "./VideoStatistics.js";
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
    next?: {
        [key: string]: any;
    };
    player?: {
        [key: string]: any;
    };
}
export type Map$Video = {
    contents?: any;
    videoPrimaryInfoRenderer?: any;
    videoSecondaryInfoRenderer?: any;
    commentsEntryPoint?: any;
    commentsSection?: any;
    secondaryResults?: any[];
    playlist?: any;
    videoDetails?: any;
    metadataRowContainer?: any;
    microformat?: any;
    startTime?: any;
};
export default class Resource$Video {
    static parse(data: Data$Video, client: YouTubeClient, context: YouTubeContext): Schema$Video;
    private static map;
}
