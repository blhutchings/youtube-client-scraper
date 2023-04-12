import { getChannelHandle } from "../../../util/ParserUtils.js";
import { Schema$Thumbnail } from "../../common/ThumbnailDetails.js";
import { Map$Gaming } from "./Gaming.js";

export interface Schema$GamingSnippet {
    title?: string;
    thumbnail?: Schema$Thumbnail[];
    subscriberCountText?: string;
    channelHandle?: string
}

export class Resource$GamingSnippet {

    static parse(data: Map$Gaming): Schema$GamingSnippet {
        let GamingSnippet: Schema$GamingSnippet = {};

        GamingSnippet['title'] = data.header?.title?.simpleText;
        GamingSnippet['thumbnail'] = data.header?.avatar.thumbnails
        GamingSnippet['subscriberCountText'] = data.header?.subtitle.simpleText
        GamingSnippet['channelHandle'] = getChannelHandle(data.header?.navigationEndpoint.browseEndpoint.canonicalBaseUrl);

        return GamingSnippet;
    }
}