import { getFirstNumberInRuns } from "../../util/ParserUtils.js";
export default class Resource$VideoLiveStreamingDetails {
    static parse(data) {
        let VideoLiveStreamingDetails = {};
        VideoLiveStreamingDetails['startTimestamp'] = data.microformat?.liveBroadcastDetails?.startTimestamp;
        VideoLiveStreamingDetails['endTimestamp'] = data.microformat?.liveBroadcastDetails?.endTimestamp;
        VideoLiveStreamingDetails['concurrentViewers'] = getFirstNumberInRuns(data.videoPrimaryInfoRenderer?.viewCount?.videoViewCountRenderer?.viewCount?.runs);
        return VideoLiveStreamingDetails;
    }
}
