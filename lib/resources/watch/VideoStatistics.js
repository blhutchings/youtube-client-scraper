import { getNumber } from "../../util/ParserUtils.js";
export default class Resource$VideoStatistics {
    static parse(data) {
        const map = Resource$VideoStatistics.map(data);
        let VideoStatistics = {};
        VideoStatistics['viewCount'] = getNumber(map.viewCount);
        VideoStatistics['likeCount'] = getNumber(map.likeButton?.toggleButtonRenderer?.defaultText?.accessibility?.accessibilityData?.label);
        VideoStatistics['commentCountText'] = map.commentCount?.simpleText;
        return VideoStatistics;
    }
    static map(data) {
        return {
            viewCount: data.videoDetails?.viewCount,
            likeButton: data.videoPrimaryInfoRenderer?.videoActions?.menuRenderer?.topLevelButtons?.find((p) => p?.segmentedLikeDislikeButtonRenderer)?.segmentedLikeDislikeButtonRenderer?.likeButton,
            commentCount: data.commentsEntryPoint?.find((p) => p?.commentsEntryPointHeaderRenderer)?.commentsEntryPointHeaderRenderer?.commentCount,
        };
    }
}
