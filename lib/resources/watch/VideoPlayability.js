import Resource$Video from "./Video.js";
export default class Resource$VideoPlayability {
    static parse(data, client, context) {
        let VideoPlayability = {};
        VideoPlayability['status'] = data.player?.playabilityStatus?.status;
        VideoPlayability['reason'] = data.player?.playabilityStatus?.reason;
        const trailer = data.player?.playabilityStatus?.errorScreen?.ypcTrailerRenderer?.unserializedPlayerResponse;
        VideoPlayability['trailer'] = trailer && Resource$Video.parse({
            player: trailer,
            next: undefined
        }, client, context);
        return VideoPlayability;
    }
}
