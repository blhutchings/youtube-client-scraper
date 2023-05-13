import { Map$Game } from "./Game.js";
export interface Schema$GameAbout {
    description?: string;
    publishedAt?: string;
    links?: {
        title?: string;
        icon?: string;
        url?: string;
    }[];
}
export declare class Resource$GameAbout {
    static parse(data: Map$Game): Schema$GameAbout;
}
