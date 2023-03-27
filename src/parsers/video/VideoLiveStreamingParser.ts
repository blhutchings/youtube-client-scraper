import RequestFactory from "../../requests/RequestFactory.js";
import { getNumber } from "../util/ParserUtils.js";
import { VideoPartsMap } from "./VideoParts.js";

export default class VideoLiveStreamingDetails {
    startTimestamp?: Date;
    endTimestamp?: Date;
    concurrentViewers?: number;

    constructor(data: VideoPartsMap) {
        this.startTimestamp = data.microformat?.liveBroadcastDetails?.startTimestamp;
        this.endTimestamp = data.microformat?.liveBroadcastDetails?.endTimestamp;
        this.concurrentViewers = data.videoPrimaryInfoRenderer?.viewCount?.videoViewCountRenderer?.viewCount?.runs?.find((obj: any) => getNumber(obj.text) !== undefined)?.text;
    }
}
