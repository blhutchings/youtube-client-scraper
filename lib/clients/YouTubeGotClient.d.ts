import { Got, Options } from "got";
import { YouTubeConfigContext } from "../types/YouTubeConfig.js";
import YouTubeClient from "./YouTubeClient.js";
export default class YouTubeGotClient implements YouTubeClient {
    readonly got: Got;
    readonly config: YouTubeConfigContext;
    private constructor();
    static createClient(options?: Options): Promise<YouTubeClient>;
    private static createDefaultHeaders;
    private static createConfig;
}
