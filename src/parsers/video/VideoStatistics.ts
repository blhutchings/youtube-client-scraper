import { getNumber } from "../util/ParserUtils.js";
import { VideoPartsMap } from "./VideoParts.js";

export default class VideoStatistics {
    viewCount?: number;
    likeCount?: number;
    commentCountText?: string;

    constructor(data: VideoPartsMap) {
        const map = VideoStatistics.map(data);

        this.viewCount = getNumber(map.viewCount);
        this.likeCount = getNumber(map.likeButton?.toggleButtonRenderer?.defaultText?.accessibility?.accessibilityData?.label);
        this.commentCountText = map.commentCount?.simpleText;
    }

    private static map(data: VideoPartsMap): VideoStatisticsMap {
        return {
            viewCount: data.videoDetails?.viewCount,
            likeButton: data.videoPrimaryInfoRenderer?.videoActions?.menuRenderer?.topLevelButtons?.find((p: any) => p?.segmentedLikeDislikeButtonRenderer)?.segmentedLikeDislikeButtonRenderer?.likeButton,
            commentCount: data.commentsEntryPoint?.find((p: any) => p?.commentsEntryPointHeaderRenderer)?.commentsEntryPointHeaderRenderer?.commentCount,
        }
    }
}

interface VideoStatisticsMap {
    viewCount?: any;
    likeButton?: any;
    commentCount?: any;
}