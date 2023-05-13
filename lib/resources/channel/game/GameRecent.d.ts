import { Schema$RichItemRenderer } from "../../common/RichItemRenderer.js";
import { Map$Game } from "./Game.js";
export interface Schema$GameRecent {
    results?: Schema$RichItemRenderer[];
    continue: () => Promise<Schema$RichItemRenderer | undefined>;
}
export declare class Resource$GameRecent {
    static parse(data: Map$Game): Schema$GameRecent;
}
