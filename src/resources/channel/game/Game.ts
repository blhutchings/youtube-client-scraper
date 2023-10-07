import YouTubeClient from "../../../clients/YouTubeClient.js";
import YouTubeContext from "../../../clients/YouTubeContext.js";
import { Schema$GameAbout, Resource$GameAbout } from "./GameAbout.js";
import { Schema$GameLive, Resource$GameLive } from "./GameLive.js";
import { Schema$GameRecent, Resource$GameRecent } from "./GameRecent.js";
import { Schema$GameSnippet, Resource$GameSnippet } from "./GameSnippet.js";
import { Resource$GameHome, Schema$GameHome } from "./GameHome.js";
import { Resource$GameOfficial, Schema$GameOfficial } from "./GameOfficial.js";
import InvalidMixedIdError from "../../../util/InvalidMixedIdError.js";


export interface Schema$Game {
    id?: string;
    snippet?: Schema$GameSnippet;
    home?: Schema$GameHome;
    live?: Schema$GameLive;
    recent?: Schema$GameRecent;
	official?: Schema$GameOfficial;
    about?: Schema$GameAbout;
}

export type Map$Game = {
    header?: any;
    microformat?: any;
    home?: any[];
    live?: any[];
    recent?: any;
	official?: any[]
    about?: any;
}

export class Resource$Game {
    static parse(data: any, client: YouTubeClient, context: YouTubeContext): Schema$Game {
		if (data.header?.interactiveTabbedHeaderRenderer.type !== 'INTERACTIVE_TABBED_HEADER_RENDERER_TYPE_GAMING') {
			throw new InvalidMixedIdError("browseId is not for a VideoGame Channel", data.metadata.channelMetadataRenderer.externalId)
		}
		
        const map: Map$Game = Resource$Game.map(data);
        let Game: Schema$Game = {};


        Game['id'] = map.microformat.urlCanonical.split('/').pop();
        Game['snippet'] = Resource$GameSnippet.parse(map);
        Game['home'] = map.home ? Resource$GameHome.parse(map): undefined;
        Game['live'] = map.live ? Resource$GameLive.parse(map, client, context) : undefined;
        Game['recent'] = map.recent ? Resource$GameRecent.parse(map) : undefined;
		Game['official'] = map.official ? Resource$GameOfficial.parse(map) : undefined;
        Game['about'] = map.about ? Resource$GameAbout.parse(map) : undefined;

        return Game;
    }

    private static map(data: any): Map$Game {
        let Map: any = {};

        Map['header'] = data.header.interactiveTabbedHeaderRenderer
        Map['microformat'] = data.microformat.microformatDataRenderer

        data?.contents?.twoColumnBrowseResultsRenderer?.tabs?.forEach((tab: any) => {
            if (tab?.tabRenderer?.selected === true) {
                const tabKey: "home" | 'live' | 'recent' | 'official' | 'about' = tab?.tabRenderer?.title.toLowerCase();
                Map[tabKey] = Resource$Game.tabMap[tabKey]?.(tab)
            }
        });
        return Map;
    }

    private static tabMap = {
        "home": (tab: any) => {
            return tab.tabRenderer.content.sectionListRenderer?.contents
        },
        "live": (tab: any) => {
            return tab.tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents?.[0].shelfRenderer.content.gridRenderer.items
        },
        "recent": (tab: any) => {
            return tab.tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents?.[0].gridRenderer?.items
        },
		"official": (tab: any) => {
			return tab.tabRenderer.content.sectionListRenderer.contents
		},
        "about": (tab: any) => {
            return tab.tabRenderer.content.sectionListRenderer.contents?.[0]?.itemSectionRenderer?.contents?.[0]?.channelAboutFullMetadataRenderer
        }
    }
}
