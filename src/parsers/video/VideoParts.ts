import RequestFactory from "../../requests/RequestFactory.js";
import VideoLiveStreamingDetails from "./VideoLiveStreamingParser.js";
import VideoMetadata from "./VideoMetadata.js";
import VideoPlayability from "./VideoPlayability.js";
import VideoSnippet from "./VideoSnippet.js";
import VideoStatistics from "./VideoStatistics.js";

export interface VideoRequestData {
    next: any,
    player: any;
}

export default class VideoParts {
    id?: string;
    playability?: VideoPlayability;
    snippet?: VideoSnippet;
    statistics?: VideoStatistics;
    liveStreamingDetails?: VideoLiveStreamingDetails;
    metadata?: VideoMetadata;
    secondaryResults?: any;
    comments?: any

    constructor(data: VideoRequestData, requestFactory: RequestFactory) {
        // Base case for VideoPlayability.trailer
        if (data?.next === undefined && data?.player === undefined) return 

        const map = VideoParts.map(data);
        this.id = map?.videoDetails?.videoId;
        this.playability = new VideoPlayability(data, requestFactory);
        this.snippet = new VideoSnippet(map);
        this.statistics = new VideoStatistics(map);
        this.liveStreamingDetails = new VideoLiveStreamingDetails(map);
        this.metadata = new VideoMetadata(map);
        //secondaryResults: this.videoSecondaryResultsParser.parse(next, player, requestFactory, map),
        //comments: this.videoCommentsParser.parse(next, player, requestFactory, map),
    }

    private static map(data: VideoRequestData): VideoPartsMap {
        const next = data?.next;
        const player = data?.player;

        const contents = next?.contents?.twoColumnWatchNextResults

        let results = contents?.results?.results?.contents

        const videoPrimaryInfoRenderer = results?.find((p: any) => p?.videoPrimaryInfoRenderer)?.videoPrimaryInfoRenderer
        const videoSecondaryInfoRenderer = results?.find((p: any) => p?.videoSecondaryInfoRenderer)?.videoSecondaryInfoRenderer
        const commentsEntryPoint = results?.find((p: any) => p?.itemSectionRenderer?.sectionIdentifier === "comments-entry-point")?.itemSectionRenderer?.contents
        const commentsSection = results?.find((p: any) => p?.itemSectionRenderer?.sectionIdentifier === "comment-item-section")?.itemSectionRenderer?.contents

        const secondaryResults = contents?.secondaryResults?.secondaryResults?.results
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

            secondaryResults: secondaryResults,
            videoDetails: videoDetails,
            metadataRowContainer: metadataRowContainer,

            microformat: microformat,
            startTime: startTime
        }
    }
}

export interface VideoPartsMap {
    contents?: any
    videoPrimaryInfoRenderer?: any
    videoSecondaryInfoRenderer?: any
    commentsEntryPoint?: any;
    commentsSection?: any;
    secondaryResults?: any
    videoDetails?: any
    metadataRowContainer?: any
    microformat?: any
    startTime?: any
}
