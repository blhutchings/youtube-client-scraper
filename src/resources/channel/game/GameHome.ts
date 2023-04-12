import { Resource$GameCard, Schema$GameCard } from "../../common/GameCard.js";
import { Map$Game } from "./Game.js";


export interface Schema$GameHome {
    fromDeveloper?: Schema$GameCard[];
}

export class Resource$GameHome {
    static parse(data: Map$Game) {
        let GameHome: Schema$GameHome = {};

        const gameSection = data.home?.findLast((content: any) => content.itemSectionRenderer.contents[0].horizontalCardListRenderer?.cards[0].gameCardRenderer)
        const games = gameSection?.itemSectionRenderer.contents[0].horizontalCardListRenderer.cards
        GameHome['fromDeveloper'] = games?.flatMap((item: any) => {
            if (item.gameCardRenderer?.game.gameDetailsRenderer) {
                return Resource$GameCard.parse(item.gameCardRenderer.game.gameDetailsRenderer)
            } else {
                return []
            }
        })
        return GameHome;
    }

}