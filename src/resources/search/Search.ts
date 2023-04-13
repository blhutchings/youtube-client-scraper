import YouTubeClient from "../../clients/YouTubeClient.js";
import YouTubeContext from "../../YouTubeContext.js";
import { getNumber } from "../../util/ParserUtils.js";
import { Resource$SearchGame, Schema$SearchGame } from "./SearchGame.js";
import { Resource$SearchResults, Schema$SearchResults } from "./SearchResults.js";

export interface Schema$Search {
    estimatedResults?: number;
    results?: Schema$SearchResults;
    game?: Schema$SearchGame;
    relatedQueries?: string[];
}


export class Resource$Search {
    static parse(data: any, client: YouTubeClient, context: YouTubeContext): Schema$Search {
        let Search: Schema$Search = {};

        const primaryContents = data.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents;
        const secondaryContents = data.contents.twoColumnSearchResultsRenderer.secondaryContents.secondarySearchContainerRenderer.contents;

        Search['estimatedResults'] = getNumber(data.estimatedResults);
        Search['results'] = Resource$SearchResults.parse(primaryContents, client, context);
        Search['game'] = Resource$SearchGame.parse(secondaryContents?.[0].universalWatchCardRenderer.header.watchCardRichHeaderRenderer);

        const relatedQueries = primaryContents[0].itemSectionRenderer.contents.find((item: any) => item.horizontalCardListRenderer !== undefined)?.horizontalCardListRenderer.cards
        Search['relatedQueries'] = relatedQueries.flatMap((card: any) => {
            if (card.searchRefinementCardRenderer) {
                return card.searchRefinementCardRenderer.searchEndpoint.searchEndpoint.query
            } else {
                return [];
            }
        })

        return Search;
    }
}