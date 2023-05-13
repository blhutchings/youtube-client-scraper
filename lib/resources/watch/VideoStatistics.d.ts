import { Map$Video } from "./Video.js";
export interface Schema$VideoStatistics {
    viewCount?: number;
    likeCount?: number;
    commentCountText?: string;
}
export interface Map$VideoStatistics {
    viewCount?: any;
    likeButton?: any;
    commentCount?: any;
}
export default class Resource$VideoStatistics {
    static parse(data: Map$Video): Schema$VideoStatistics;
    private static map;
}
