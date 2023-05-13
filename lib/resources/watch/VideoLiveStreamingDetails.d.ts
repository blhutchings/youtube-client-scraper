import { Map$Video } from "./Video.js";
export interface Schema$VideoLiveStreamingDetails {
    startTimestamp?: Date;
    endTimestamp?: Date;
    concurrentViewers?: number;
}
export default class Resource$VideoLiveStreamingDetails {
    static parse(data: Map$Video): Schema$VideoLiveStreamingDetails;
}
