import RequestFactory from "../../requests/RequestFactory.js";
import VideoParts, { VideoRequestData } from "./VideoParts.js";

export default class VideoPlayability {
    status?: string;
    reason?: string;
    trailer?: VideoParts;

    constructor(data: VideoRequestData, requestFactory: RequestFactory) {
        this.status = data.player.playabilityStatus?.status;
        this.reason = data.player.playabilityStatus?.reason;
        this.trailer = new VideoParts({
            player: data.player.playabilityStatus?.errorScreen?.ypcTrailerRenderer?.unserializedPlayerResponse,
            next: undefined
        }, requestFactory)
    }
}
