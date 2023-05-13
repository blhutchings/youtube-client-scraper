import { YouTubeConfig } from "../types/YouTubeConfig.js";
export default class YouTubeConfigExtractor {
    private constructor();
    private static re_ytcfg;
    static extract_ytcfg(html: string): YouTubeConfig;
}
