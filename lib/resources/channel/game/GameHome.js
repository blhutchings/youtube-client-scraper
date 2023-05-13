import { Resource$GameCard } from "../../common/GameCard.js";
export class Resource$GameHome {
    static parse(data) {
        let GameHome = {};
        const gameSection = data.home?.findLast((content) => content.itemSectionRenderer.contents[0].horizontalCardListRenderer?.cards[0].gameCardRenderer);
        const games = gameSection?.itemSectionRenderer.contents[0].horizontalCardListRenderer.cards;
        GameHome['fromDeveloper'] = games?.flatMap((item) => {
            if (item.gameCardRenderer?.game.gameDetailsRenderer) {
                return Resource$GameCard.parse(item.gameCardRenderer.game.gameDetailsRenderer);
            }
            else {
                return [];
            }
        });
        return GameHome;
    }
}
