import { Schema$GameCard } from "../../common/GameCard.js";
import { Map$Game } from "./Game.js";
export interface Schema$GameHome {
    fromDeveloper?: Schema$GameCard[];
}
export declare class Resource$GameHome {
    static parse(data: Map$Game): Schema$GameHome;
}
