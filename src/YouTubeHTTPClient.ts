import { HttpsAgent } from "agentkeepalive";
import got, { Got, Options } from "got";
import { CookieJar } from "tough-cookie";
import YouTubeRequest from "./requests/YouTubeRequest.js";

export default class YouTubeHTTPClient {
    private client: Got

    // Add Fingerprint generator
    constructor() {
        const httpsAgent = new HttpsAgent({
            ciphers: undefined,
            keepAlive: true,
        })

        const cookieJar = new CookieJar();

        const defaultOptions = new Options({
            prefixUrl: 'https://youtube.com',
            cookieJar: cookieJar,
            agent: {
                https: httpsAgent,
            },
        })
        
        this.client = got.extend(defaultOptions)
    }

    get(path: string) {
        return this.client(path)
    }

    execute(request: YouTubeRequest) {
        
    }
}