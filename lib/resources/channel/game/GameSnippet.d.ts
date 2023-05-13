import { Schema$Thumbnail } from "../../common/ThumbnailDetails.js";
import { Map$Game } from "./Game.js";
export interface Schema$GameSnippet {
    title?: string;
    description?: string;
    metadata?: string[];
    badges?: string[];
    boxart?: Schema$Thumbnail;
    banner?: Schema$Thumbnail;
}
export declare class Resource$GameSnippet {
    static parse(data: Map$Game): Schema$GameSnippet;
}
