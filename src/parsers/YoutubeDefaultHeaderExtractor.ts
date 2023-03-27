
import { YouTubeConfig } from "../interfaces/YouTubeConfig.js";


export default class YoutubeDefaultHeaderExtractor {
    private constructor() {};
    static create(ytcfg: Partial<YouTubeConfig>) {
        return {
            "accept": "/*",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US",
            "cache-control": "no-cache",
            "content-length": undefined,
            "content-type": "application/json",
            "cookie": undefined,
            "dnt": "1",
            "origin": `https://www.youtube.com`,
            "pragma": `no-cache`,
            "referer": undefined,
            "sec-ch-ua": ytcfg.INNERTUBE_CONTEXT?.client.userAgent,
            "sec-ch-ua-arch": "x86",
            "sec-ch-ua-bitness": "64",
            "sec-ch-ua-full-version": "111.0.5563.64",
            "sec-ch-ua-full-version-list": ytcfg.INNERTUBE_CONTEXT?.client.userAgent,
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-model": ytcfg.INNERTUBE_CONTEXT?.client.deviceModel,
            "sec-ch-ua-platform": ytcfg.INNERTUBE_CONTEXT?.client.osName,
            "sec-ch-ua-platform-version": ytcfg.INNERTUBE_CONTEXT?.client.osVersion,
            "sec-ch-ua-wow64": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "same-origin",
            "sec-fetch-site": "same-origin",
            "user-agent": ytcfg.INNERTUBE_CONTEXT?.client.userAgent,
            "x-goog-visitor-id": ytcfg.INNERTUBE_CONTEXT?.client.visitorData,
            "x-youtube-bootstrap-logged-in": ytcfg.LOGGED_IN?.toString(),
            "x-youtube-client-name": ytcfg.INNERTUBE_CONTEXT_CLIENT_NAME?.toString(),
            "x-youtube-client-version": ytcfg.INNERTUBE_CONTEXT_CLIENT_VERSION
        }
    }
}