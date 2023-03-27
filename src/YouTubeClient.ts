import { HttpsAgent } from "agentkeepalive";
import got, { Got, Options, OptionsOfTextResponseBody } from "got";
import { CookieJar } from "tough-cookie";
import YouTubeConfigExtractor from "./parsers/YouTubeConfigExtractor.js";
import YoutubeDefaultHeaderExtractor from "./parsers/YoutubeDefaultHeaderExtractor.js";
import { VideoParts } from "./parsers/video/VideoPartsParser.js";

interface YouTubeClientContext {
    readonly apiKey: string
    readonly clientContext?: any;
    readonly defaultHeaders?: any;
    currentUrl?: string
}

export class YouTubeClient {
    private client: Got
    private context: YouTubeClientContext

    protected constructor(client: Got, context: YouTubeClientContext) {
        this.client = client;
        this.context = context;
    }

    static async createClient(): Promise<YouTubeClient> {
        const httpsAgent = new HttpsAgent({
            ciphers: undefined,
            keepAlive: true,
        })

        const cookieJar = new CookieJar();

        const defaultOptions = new Options({
            prefixUrl: 'https://youtube.com',
            agent: {
                https: httpsAgent,
            },
            cookieJar: cookieJar,
        })

        const instance = got.extend(defaultOptions)
        const res = await instance.get('')
        const config = YouTubeConfigExtractor.extract(res.body)

        let apiKey = config.INNERTUBE_API_KEY
        let clientContext = config.INNERTUBE_CONTEXT
        let defaultHeaders = YoutubeDefaultHeaderExtractor.create(config)
        let currentUrl = config.INNERTUBE_CONTEXT?.client?.originalUrl

        if (!apiKey) {
            apiKey = "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8"
            console.warn("YouTube Inner API key could not be found: Using AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8")
        }

        return new YouTubeClient(instance, {
            apiKey: apiKey,
            clientContext: clientContext,
            defaultHeaders: defaultHeaders,
            currentUrl: currentUrl
        });
    }

    get<T>(path: string, options: OptionsOfTextResponseBody): Promise<T> {
        return this.client.get(path, options).json()
    }

    async getVideo(videoId: string): Promise<void | VideoParts> {
        //new VideoNextRequest(this, this.context)
    }
}