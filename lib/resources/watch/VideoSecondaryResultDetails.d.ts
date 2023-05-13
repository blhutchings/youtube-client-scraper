import YouTubeClient from "../../clients/YouTubeClient.js";
import YouTubeContext from "../../YouTubeContext.js";
import { Map$Video } from "./Video.js";
import { Schema$CompactRendererMovie } from "./secondary-result/CompactRendererMovie.js";
import { Schema$CompactRendererPlaylist } from "./secondary-result/CompactRendererPlaylist.js";
import { Schema$CompactRendererVideo } from "./secondary-result/CompactRendererVideo.js";
export interface Schema$VideoSecondaryResultDetails {
    results?: (Schema$CompactRendererPlaylist | Schema$CompactRendererVideo | Schema$CompactRendererMovie)[];
    continue: () => Promise<Schema$VideoSecondaryResultDetails | undefined>;
}
export default class Resource$VideoSecondaryResultDetails {
    static parse(data: Map$Video, client: YouTubeClient, context: YouTubeContext): Schema$VideoSecondaryResultDetails;
}
