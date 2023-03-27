import { RequestFactory } from "../../requests/RequestFactory.js";
import { Parser } from "../Parser.js";
import { getNumber } from "../util/ParserUtils.js";

export interface VideoStatistics {
    viewCount?: number,
    likeCount?: number,
    commentCountText?: string
}

interface VideoStatisticsMap {
    viewCount?: any;
    likeButton?: any;
    commentCount?: any;
}

export class VideoStatisticsParser extends Parser {
    protected map(next: any, player: any, requestFactory: RequestFactory, map: any): VideoStatisticsMap {
        return {
            viewCount: map.videoDetails?.viewCount,
            likeButton: map.videoPrimaryInfoRenderer?.videoActions?.menuRenderer?.topLevelButtons?.find((p: any) => p?.segmentedLikeDislikeButtonRenderer)?.segmentedLikeDislikeButtonRenderer?.likeButton,
            commentCount: map.commentsEntryPoint?.find((p: any) => p?.commentsEntryPointHeaderRenderer)?.commentsEntryPointHeaderRenderer?.commentCount,
        }
    }

    protected extract(next: any, player: any, requestFactory: RequestFactory, map: VideoStatisticsMap): VideoStatistics {
        return {
            viewCount: getNumber(map.viewCount),
            likeCount: getNumber(map.likeButton?.toggleButtonRenderer?.defaultText?.accessibility?.accessibilityData?.label),
            commentCountText: map.commentCount?.simpleText
        }
    }
}
