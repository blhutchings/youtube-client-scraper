class YouTubeConfigExtractor {
    constructor() { }
    ;
    static re_ytcfg = new RegExp(/ytcfg.set\(({.*})\);/);
    static extract_ytcfg(html) {
        let match = html.match(YouTubeConfigExtractor.re_ytcfg);
        if (!match)
            throw Error("Could not extract ytcfg");
        return JSON.parse(match[1]);
    }
}
export default YouTubeConfigExtractor;
