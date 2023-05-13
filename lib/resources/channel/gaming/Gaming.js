import { Resource$GamingLive } from "./GamingLive.js";
import { Resource$GamingSnippet } from "./GamingSnippet.js";
import { Resource$GamingTrending } from "./GamingTrending.js";
export class Resource$Gaming {
    static parse(data, client, context) {
        const map = Resource$Gaming.map(data);
        let Gaming = {};
        Gaming['id'] = map.header?.navigationEndpoint.browseEndpoint.browseId;
        Gaming['snippet'] = Resource$GamingSnippet.parse(map);
        Gaming['live'] = map.live ? Resource$GamingLive.parse(map, client, context) : undefined;
        Gaming['trending'] = map.trending ? Resource$GamingTrending.parse(map, client, context) : undefined;
        return Gaming;
    }
    static map(data) {
        let Map = {};
        Map['header'] = data.header.carouselHeaderRenderer.contents[0].topicChannelDetailsRenderer;
        data?.contents?.twoColumnBrowseResultsRenderer?.tabs?.forEach((tab) => {
            if (tab?.tabRenderer?.selected === true) {
                const shelfRenderer = tab?.tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].shelfRenderer;
                const shelfTitle = shelfRenderer.title.runs[0].text;
                if (shelfTitle === 'Trending videos') {
                    Map['trending'] = shelfRenderer.content.gridRenderer.items;
                }
                else if (shelfTitle === 'Top live games') {
                    Map['live'] = shelfRenderer.content.gridRenderer.items;
                }
                else {
                    throw new Error("Unidentified shelfTitle", { cause: data });
                }
            }
        });
        return Map;
    }
}
