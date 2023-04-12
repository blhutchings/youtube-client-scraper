import YouTubeClient from "../../YouTubeClient.js";
import YouTubeContext from "../../YouTubeContext.js";
import Resource$Video, { Schema$Video, Data$Video } from "./Video.js";

export interface Schema$VideoPlayability {
    status?: string;
    reason?: string;
    trailer?: Schema$Video;
}

export default class Resource$VideoPlayability {

    static parse(data: Data$Video, client: YouTubeClient, context: YouTubeContext): Schema$VideoPlayability {
        let VideoPlayability: Schema$VideoPlayability = {};
        
        VideoPlayability['status'] = data.player?.playabilityStatus?.status;
        VideoPlayability['reason'] = data.player?.playabilityStatus?.reason;
        const trailer = data.player?.playabilityStatus?.errorScreen?.ypcTrailerRenderer?.unserializedPlayerResponse
        VideoPlayability['trailer'] = trailer && Resource$Video.parse({
            player: trailer,
            next: undefined
        }, client, context)

        return VideoPlayability;
    }
}
