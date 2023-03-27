import { RequestFactory } from "../../requests/RequestFactory.js";
import { Parser } from "../Parser.js";
import { VideoLiveStreamingDetails, VideoLiveStreamingDetailsParser } from "./VideoLiveStreamingParser.js";
import { VideoMetadataParser } from "./VideoMetadataParser.js";
import { VideoPlayability, VideoPlayabilityParser } from "./VideoPlayabilityParser.js";
import { VideoSnippet, VideoSnippetParser } from "./VideoSnippetParser.js";
import { VideoStatistics, VideoStatisticsParser } from "./VideoStatisticsParser.js";

export interface VideoParts {
    id: string,
    playability?: VideoPlayability;
    snippet?: VideoSnippet;
    statistics?: VideoStatistics;
    liveStreamingDetails?: VideoLiveStreamingDetails;
    metadata?: any;
    secondaryResults?: any;
    comments?: any
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

export class VideoPartsParser extends Parser {
    private videoPlayabilityParser = new VideoPlayabilityParser();
    private videoSnippetParser = new VideoSnippetParser();
    private videoStatisticsParser = new VideoStatisticsParser();
    private videoLiveStreamingParser = new VideoLiveStreamingDetailsParser()
    private videoMetadataParser = new VideoMetadataParser()
    //private videoSecondaryResultsParser
    //private videoCommentsParser

    protected map(next: any, player: any, requestFactory: RequestFactory, map: any,): VideoPartsMap {
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

    protected extract(next: any, player: any, requestFactory: RequestFactory, map: VideoPartsMap) {
        return {
            id: map?.videoDetails?.videoId,
            playability: this.videoPlayabilityParser.parse(next, player, requestFactory, map),
            snippet: this.videoSnippetParser.parse(next, player, requestFactory, map),
            statistics: this.videoStatisticsParser.parse(next, player, requestFactory, map),
            liveStreamingDetails: this.videoLiveStreamingParser.parse(next, player, requestFactory, map),
            metadata: this.videoMetadataParser.parse(next, player, requestFactory, map),
            //secondaryResults: this.videoSecondaryResultsParser.parse(next, player, requestFactory, map),
            //comments: this.videoCommentsParser.parse(next, player, requestFactory, map),
        }
    }
}