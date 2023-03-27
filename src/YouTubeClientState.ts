import { YouTubeConfig } from "./types/YouTubeConfig.js";
import { Headers } from "got";

export default class YouTubeClientState{
    readonly apiKey: string
    readonly innerTubeContext: any;
    readonly defaultHeaders: Headers;
    private page: {
        currentUrl?: string
        referer?: string
    };

    constructor(ytcfg: YouTubeConfig) {
        if (!ytcfg.INNERTUBE_API_KEY ) {
            this.apiKey = "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8"
            console.warn(`INNERTUBE_API_KEY could not be found: using ${this.apiKey}`)
        } else {
            this.apiKey = ytcfg.INNERTUBE_API_KEY
        }
        this.innerTubeContext = ytcfg.INNERTUBE_CONTEXT;
        this.defaultHeaders = this.createDefaultHeaders(ytcfg);

        this.page = {
            currentUrl: ytcfg.INNERTUBE_CONTEXT?.client?.originalUrl,
            referer: ytcfg.INNERTUBE_CONTEXT?.client?.originalUrl
        }

    }

    transition(url: string) {
        this.page.referer = this.page.currentUrl
        this.page.currentUrl = url;
    }

    private createDefaultHeaders(ytcfg: Partial<YouTubeConfig>): Headers {
        return {
            "accept": "/*",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": ytcfg.GAPI_LOCALE,
            "cache-control": "no-cache",
            "content-type": "application/json",
            "dnt": "1",
            "origin": `https://www.youtube.com`,
            "pragma": `no-cache`,
            "sec-ch-ua": ytcfg.INNERTUBE_CONTEXT?.client?.userAgent,
            "sec-ch-ua-full-version-list": ytcfg.INNERTUBE_CONTEXT?.client?.userAgent,
            "sec-ch-ua-model": ytcfg.INNERTUBE_CONTEXT?.client?.deviceModel,
            "sec-ch-ua-platform": ytcfg.INNERTUBE_CONTEXT?.client?.osName,
            "sec-ch-ua-platform-version": ytcfg.INNERTUBE_CONTEXT?.client?.osVersion,
            "user-agent": ytcfg.INNERTUBE_CONTEXT?.client?.userAgent,
            "x-goog-visitor-id": ytcfg.INNERTUBE_CONTEXT?.client?.visitorData,
            "x-youtube-bootstrap-logged-in": ytcfg.LOGGED_IN?.toString(),
            "x-youtube-client-name": ytcfg.INNERTUBE_CONTEXT_CLIENT_NAME?.toString(),
            "x-youtube-client-version": ytcfg.INNERTUBE_CONTEXT_CLIENT_VERSION
        }
    }
}