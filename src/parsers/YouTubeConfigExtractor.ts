import { YouTubeConfig } from "../interfaces/YouTubeConfig.js"

export default class YouTubeConfigExtractor {
    private constructor() {};
    private static re_ytcfg = new RegExp(/ytcfg.set\(({.*})\);/)

    static extract(html: string): YouTubeConfig {
        let match = html.match(YouTubeConfigExtractor.re_ytcfg)
        if (!match) throw Error("Could not extract ytcfg")
        return JSON.parse(match[1]) as YouTubeConfig
    }
}
