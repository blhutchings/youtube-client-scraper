import { Resource$GameAbout } from "./GameAbout.js";
import { Resource$GameLive } from "./GameLive.js";
import { Resource$GameRecent } from "./GameRecent.js";
import { Resource$GameSnippet } from "./GameSnippet.js";
import { Resource$GameHome } from "./GameHome.js";
class Resource$Game {
    static parse(data, client, context) {
        const map = Resource$Game.map(data);
        let Game = {};
        Game['id'] = map.microformat.urlCanonical.split('/').pop();
        Game['snippet'] = Resource$GameSnippet.parse(map);
        Game['home'] = map.home ? Resource$GameHome.parse(map) : undefined;
        Game['live'] = map.live ? Resource$GameLive.parse(map, client, context) : undefined;
        Game['recent'] = map.recent ? Resource$GameRecent.parse(map) : undefined;
        Game['about'] = map.about ? Resource$GameAbout.parse(map) : undefined;
        return Game;
    }
    static map(data) {
        let Map = {};
        Map['header'] = data.header.interactiveTabbedHeaderRenderer;
        Map['microformat'] = data.microformat.microformatDataRenderer;
        data?.contents?.twoColumnBrowseResultsRenderer?.tabs?.forEach((tab) => {
            if (tab?.tabRenderer?.selected === true) {
                const tabKey = tab?.tabRenderer?.title.toLowerCase();
                Map[tabKey] = Resource$Game.tabMap[tabKey]?.(tab);
            }
        });
        return Map;
    }
    static tabMap = {
        "home": (tab) => {
            return tab?.tabRenderer?.content?.sectionListRenderer?.contents;
        },
        "live": (tab) => {
            return tab?.tabRenderer?.content?.sectionListRenderer.contents[0].itemSectionRenderer.contents?.[0].shelfRenderer.content.gridRenderer.items;
        },
        "recent": (tab) => {
            return tab?.tabRenderer?.content?.sectionListRenderer.contents[0].itemSectionRenderer.contents?.[0].gridRenderer?.items;
        },
        "about": (tab) => {
            return tab?.tabRenderer?.content?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer?.contents?.[0]?.channelAboutFullMetadataRenderer;
        }
    };
}
export { Resource$Game };
