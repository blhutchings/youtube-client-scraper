import YouTubeClient from "../../../clients/YouTubeClient.js";
import YouTubeContext from "../../../clients/YouTubeContext.js";
import Resource$AccountAbout, { Schema$AccountAbout } from "./AccountAbout.js";
import Resource$AccountLive, { Schema$AccountLive } from "./AccountLive.js";
import Resource$AccountSnippet, { Schema$AccountSnippet } from "./AccountSnippet.js";
import Resource$AccountVideos, { Schema$AccountVideos } from "./AccountVideos.js";

export interface Schema$Account {
    id?: string;
    snippet?: Schema$AccountSnippet;
    about?: Schema$AccountAbout;
    live?: Schema$AccountLive;
    videos?: Schema$AccountVideos;
}

export type Map$Account = {
    header?: any;
    metadata?: any;
    microformat?: any;
    videos?: any;
    live?: any;
    about?: any;
}

export class Resource$Account {
    static parse(data: any, client: YouTubeClient, context: YouTubeContext): Schema$Account {
        const map: Map$Account = Resource$Account.map(data, client, context);
        let Channel: Schema$Account = {};

        Channel['id'] = map.header?.channelId;
        Channel['snippet'] = Resource$AccountSnippet.parse(map);
        Channel['about'] = map.about ? Resource$AccountAbout.parse(map) : undefined;
        Channel['live'] = map.live ? Resource$AccountLive.parse(map, client, context) : undefined;
        Channel['videos'] = map.videos ? Resource$AccountVideos.parse(map, client, context) : undefined;

        return Channel;
    }

    private static map(data: any, client: YouTubeClient, context: YouTubeContext): Map$Account {
        let Map: any = {};

        Map['header'] = data?.header?.c4TabbedHeaderRenderer
        Map['metadata'] = data?.metadata?.channelMetadataRenderer
        Map['microformat'] = data?.microformat?.microformatDataRenderer

        data?.contents?.twoColumnBrowseResultsRenderer?.tabs?.forEach((tab: any) => {
            if (tab?.tabRenderer?.selected === true) {
                const tabKey: 'videos' | 'live' | 'about' = tab?.tabRenderer?.title.toLowerCase();
                Map[tabKey] = Resource$Account.tabMap[tabKey]?.(tab)
            }
        });
        return Map;
    }

    private static tabMap = {
        "videos": (tab: any) => {
            return tab?.tabRenderer?.content?.richGridRenderer
        },
        "live": (tab: any) => {
            return tab?.tabRenderer?.content?.richGridRenderer
        },
        "about": (tab: any) => {
            return tab?.tabRenderer?.content?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer?.contents?.[0]?.channelAboutFullMetadataRenderer
        }
    }

}
