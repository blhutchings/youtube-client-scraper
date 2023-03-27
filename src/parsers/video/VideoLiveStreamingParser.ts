import { RequestFactory } from "../../requests/RequestFactory.js"
import { Parser } from "../Parser.js"
import { getNumber } from "../util/ParserUtils.js"
import { VideoPartsMap } from "./VideoPartsParser.js"


export interface VideoLiveStreamingDetails {
    startTimestamp?: Date,
    endTimestamp?: Date,
    concurrentViewers?: number
}

export class VideoLiveStreamingDetailsParser extends Parser {
    protected extract(next: any, player: any, requestFactory: RequestFactory, map: VideoPartsMap): VideoLiveStreamingDetails {
        return {
            startTimestamp: map.microformat?.liveBroadcastDetails?.startTimestamp,
            endTimestamp: map.microformat?.liveBroadcastDetails?.endTimestamp,
            concurrentViewers: map.videoPrimaryInfoRenderer?.viewCount?.videoViewCountRenderer?.viewCount?.runs?.find((obj: any) => getNumber(obj.text) !== undefined)?.text
        }
    }
}
