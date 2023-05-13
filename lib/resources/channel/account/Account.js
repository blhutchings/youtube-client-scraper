import Resource$AccountAbout from "./AccountAbout.js";
import Resource$AccountLive from "./AccountLive.js";
import Resource$AccountSnippet from "./AccountSnippet.js";
import Resource$AccountVideos from "./AccountVideos.js";
class Resource$Account {
    static parse(data, client, context) {
        const map = Resource$Account.map(data, client, context);
        let Channel = {};
        Channel['id'] = map.header?.channelId;
        Channel['snippet'] = Resource$AccountSnippet.parse(map);
        Channel['about'] = map.about ? Resource$AccountAbout.parse(map) : undefined;
        Channel['live'] = map.live ? Resource$AccountLive.parse(map, client, context) : undefined;
        Channel['videos'] = map.videos ? Resource$AccountVideos.parse(map, client, context) : undefined;
        return Channel;
    }
    static map(data, client, context) {
        let Map = {};
        Map['header'] = data?.header?.c4TabbedHeaderRenderer;
        Map['metadata'] = data?.metadata?.channelMetadataRenderer;
        Map['microformat'] = data?.microformat?.microformatDataRenderer;
        data?.contents?.twoColumnBrowseResultsRenderer?.tabs?.forEach((tab) => {
            if (tab?.tabRenderer?.selected === true) {
                const tabKey = tab?.tabRenderer?.title.toLowerCase();
                Map[tabKey] = Resource$Account.tabMap[tabKey]?.(tab);
            }
        });
        return Map;
    }
    static tabMap = {
        "videos": (tab) => {
            return tab?.tabRenderer?.content?.richGridRenderer;
        },
        "live": (tab) => {
            return tab?.tabRenderer?.content?.richGridRenderer;
        },
        "about": (tab) => {
            return tab?.tabRenderer?.content?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer?.contents?.[0]?.channelAboutFullMetadataRenderer;
        }
    };
}
export { Resource$Account };
