import got, { Options } from "got";
import { CookieJar } from "tough-cookie";
import YouTubeClientAgent from "../YouTubeClientAgent.js";
import YouTubeConfigExtractor from "../util/YouTubeConfigExtractor.js";
export default class YouTubeGotClient {
    got;
    config;
    constructor(got, config) {
        this.got = got;
        this.config = config;
    }
    static async createClient(options) {
        const defaultOptions = new Options(options, {
            prefixUrl: "https://www.youtube.com/",
            http2: true,
            agent: {
                http2: new YouTubeClientAgent()
            },
            cookieJar: new CookieJar()
        });
        let client = got.extend(defaultOptions);
        const homepage = await client.get('');
        const ytcfg = YouTubeConfigExtractor.extract_ytcfg(homepage.body);
        const defaultHeaders = YouTubeGotClient.createDefaultHeaders(ytcfg);
        const config = YouTubeGotClient.createConfig(ytcfg);
        if (!config.INNERTUBE_CONTEXT?.client?.hl?.toLowerCase().includes("en")) {
            console.log(`YouTube localization is set to '${config.INNERTUBE_CONTEXT?.client?.hl}' and not an english varient, some properties may be undefined.`);
        }
        client = client.extend({
            headers: { ...defaultHeaders }
        });
        return new YouTubeGotClient(client, config);
    }
    static createDefaultHeaders(ytcfg) {
        return {
            "accept-encoding": "gzip, deflate, br",
            "accept-language": ytcfg.GAPI_LOCALE,
            "cache-control": "no-cache",
            "dnt": "1",
            "origin": "https://www.youtube.com",
            "pragma": "no-cache",
            "referer": "https://www.youtube.com/",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-model": ytcfg.INNERTUBE_CONTEXT?.client?.deviceModel,
            "sec-ch-ua-platform": ytcfg.INNERTUBE_CONTEXT?.client?.osName,
            "sec-ch-ua-platform-version": ytcfg.INNERTUBE_CONTEXT?.client?.osVersion,
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "same-origin",
            "sec-fetch-site": "same-origin",
            "user-agent": ytcfg.INNERTUBE_CONTEXT?.client?.userAgent,
            "x-goog-visitor-id": ytcfg.INNERTUBE_CONTEXT?.client?.visitorData,
            "x-youtube-bootstrap-logged-in": ytcfg.LOGGED_IN?.toString(),
            "x-youtube-client-name": ytcfg.INNERTUBE_CONTEXT_CLIENT_NAME?.toString(),
            "x-youtube-client-version": ytcfg.INNERTUBE_CONTEXT_CLIENT_VERSION,
        };
    }
    static createConfig(ytcfg) {
        return {
            INNERTUBE_API_VERSION: ytcfg?.INNERTUBE_API_VERSION || "v1",
            INNERTUBE_API_KEY: ytcfg?.INNERTUBE_API_KEY || "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8",
            INNERTUBE_CONTEXT: ytcfg?.INNERTUBE_CONTEXT || {},
        };
    }
}
