import { getNumber } from "../../util/ParserUtils.js";
import { Resource$SearchGame } from "./SearchGame.js";
import { Resource$SearchResults } from "./SearchResults.js";
export class Resource$Search {
    static parse(data, client, context) {
        let Search = {};
        const primaryContents = data.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents;
        const secondaryContents = data.contents.twoColumnSearchResultsRenderer.secondaryContents.secondarySearchContainerRenderer.contents;
        Search['estimatedResults'] = getNumber(data.estimatedResults);
        Search['results'] = Resource$SearchResults.parse(primaryContents, client, context);
        Search['game'] = Resource$SearchGame.parse(secondaryContents?.[0].universalWatchCardRenderer.header.watchCardRichHeaderRenderer);
        const relatedQueries = primaryContents[0].itemSectionRenderer.contents.find((item) => item.horizontalCardListRenderer !== undefined)?.horizontalCardListRenderer.cards;
        Search['relatedQueries'] = relatedQueries.flatMap((card) => {
            if (card.searchRefinementCardRenderer) {
                return card.searchRefinementCardRenderer.searchEndpoint.searchEndpoint.query;
            }
            else {
                return [];
            }
        });
        return Search;
    }
}
