import YouTubeClient from "../../../clients/YouTubeClient.js";
import YouTubeContext from "../../../YouTubeContext.js";
import { Schema$GamingLive, Resource$GamingLive } from "./GamingLive.js";
import { Schema$GamingSnippet, Resource$GamingSnippet } from "./GamingSnippet.js";
import { Schema$GamingTrending, Resource$GamingTrending } from "./GamingTrending.js";

export interface Schema$Gaming {
    id?: string;
    snippet?: Schema$GamingSnippet;
    live?: Schema$GamingLive
    trending?: Schema$GamingTrending;
}

export interface Map$Gaming {
    header?:  Record<string, any>;
    live?: Record<string, any>[];
    trending?: Record<string, any>[];
}


export class Resource$Gaming {
    static parse(data: Record<string, any>, client: YouTubeClient, context: YouTubeContext): Schema$Gaming {
        const map: Map$Gaming = Resource$Gaming.map(data);
        let Gaming: Schema$Gaming = {};

        Gaming['id'] = map.header?.navigationEndpoint.browseEndpoint.browseId;
        Gaming['snippet'] = Resource$GamingSnippet.parse(map);
        Gaming['live'] = map.live ? Resource$GamingLive.parse(map, client, context) : undefined;
        Gaming['trending'] = map.trending ? Resource$GamingTrending.parse(map, client, context) : undefined;
        
        return Gaming;
    }

    private static map(data: Record<string, any>): Map$Gaming {
         let Map: Map$Gaming = {};

        Map['header'] = data.header.carouselHeaderRenderer.contents[0].topicChannelDetailsRenderer

        data?.contents?.twoColumnBrowseResultsRenderer?.tabs?.forEach((tab: any) => {
            if (tab?.tabRenderer?.selected === true) {
                const shelfRenderer = tab?.tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].shelfRenderer
                const shelfTitle = shelfRenderer.title.runs[0].text;
                if (shelfTitle === 'Trending videos') {
                    Map['trending'] = shelfRenderer.content.gridRenderer.items
                } else if (shelfTitle === 'Top live games') {
                    Map['live'] = shelfRenderer.content.gridRenderer.items
                } else {
                    throw new Error("Unidentified shelfTitle", {cause: data})
                }
            }
        });
        return Map;
    }
}