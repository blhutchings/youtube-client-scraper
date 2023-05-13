import { getChannelHandle } from "../../../util/ParserUtils.js";
export class Resource$GamingSnippet {
    static parse(data) {
        let GamingSnippet = {};
        GamingSnippet['title'] = data.header?.title?.simpleText;
        GamingSnippet['thumbnail'] = data.header?.avatar.thumbnails;
        GamingSnippet['subscriberCountText'] = data.header?.subtitle.simpleText;
        GamingSnippet['channelHandle'] = getChannelHandle(data.header?.navigationEndpoint.browseEndpoint.canonicalBaseUrl);
        return GamingSnippet;
    }
}
