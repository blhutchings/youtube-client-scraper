import { Map$Account } from "./Account.js";
export interface Schema$AccountAbout {
    description?: string;
    totalChannelViews?: number;
    publishedAt?: string;
    country?: string;
    links?: {
        title?: string;
        icon?: string;
        url?: string;
    }[];
}
export default class Resource$AccountAbout {
    static parse(data: Map$Account): Schema$AccountAbout;
}
