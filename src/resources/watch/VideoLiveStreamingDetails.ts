import { getFirstNumberInRuns } from "../../util/ParserUtils.js";
import { Map$Video } from "./Video.js";

export interface Schema$VideoLiveStreamingDetails {
    startTimestamp?: Date;
    endTimestamp?: Date;
    concurrentViewers?: number;
}

export default class Resource$VideoLiveStreamingDetails {

    static parse(data: Map$Video): Schema$VideoLiveStreamingDetails {
        let VideoLiveStreamingDetails: Schema$VideoLiveStreamingDetails = {};

        VideoLiveStreamingDetails['startTimestamp'] = data.microformat?.liveBroadcastDetails?.startTimestamp;
        VideoLiveStreamingDetails['endTimestamp'] = data.microformat?.liveBroadcastDetails?.endTimestamp;
        VideoLiveStreamingDetails['concurrentViewers'] = getFirstNumberInRuns(data.videoPrimaryInfoRenderer?.viewCount?.videoViewCountRenderer?.viewCount?.runs)

        return VideoLiveStreamingDetails
    }
}
