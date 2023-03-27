import { RequestFactory } from "../../requests/RequestFactory.js";
import { Parser } from "../Parser.js";


export interface VideoPlayability {
    status?: string,
    reason?: string
}

export class VideoPlayabilityParser extends Parser {
    protected extract(next: any, player: any, requestFactory: RequestFactory): VideoPlayability {
        return {
            status: player.playabilityStatus?.status,
            reason: player.playabilityStatus?.reason
        }
    }
}
