import { Schema$Thumbnail } from "../../common/ThumbnailDetails.js";
import { getChannelHandle, getFirstNumberInRuns } from "../../../util/ParserUtils.js";
import { Map$Account } from "./Account.js";


export interface Schema$AccountSnippet {
    title?: string;
    description?: string;
    thumbnail?: Schema$Thumbnail;
    subscriberCountText?: string;
    videoCount?: number;
    channelHandle?: string
    tags?: string[]
    banner?: Schema$Thumbnail;
    headerLinks?: {
        title?: string;
        url?: string;
        icon?: string;
    }[];
}

export default class Resource$AccountSnippet {

    static parse(data: Map$Account): Schema$AccountSnippet {
        let AccountSnippet: Schema$AccountSnippet = {};

        AccountSnippet['title'] = data?.header?.title;
        AccountSnippet['description'] = data?.metadata?.description;
        AccountSnippet['thumbnail'] = data?.header?.avatar?.thumbnails;
        AccountSnippet['subscriberCountText'] = data?.header?.subscriberCountText?.simpleText;
        AccountSnippet['videoCount'] = getFirstNumberInRuns(data?.header?.videosCountText?.runs);
        AccountSnippet['channelHandle'] = getChannelHandle(data?.header?.navigationEndpoint?.browseEndpoint?.canonicalBaseUrl);
        AccountSnippet['tags'] = data?.microformat?.tags;
        AccountSnippet['banner'] = data?.header?.banner?.thumbnails;

        const primaryLinks = data.header.headerLinks.channelHeaderLinksRenderer.primaryLinks || [];
        const secondaryLinks = data.header.headerLinks.channelHeaderLinksRenderer.secondaryLinks || [];
        const links: any[] = primaryLinks.concat(secondaryLinks);
        if (links && links.length > 0) {
            AccountSnippet['headerLinks'] = [];
            links.forEach(link => {
                const title = link?.title?.simpleText;
                const icon = link?.icon?.thumbnails?.[0]?.url
                const url = link?.navigationEndpoint?.urlEndpoint?.url?.split('q=')?.[1]

                AccountSnippet['headerLinks']?.push({
                    title: title,
                    icon: icon,
                    url: (url !== 'undefined') ? decodeURIComponent(url) : undefined
                })
            })

        }

        return AccountSnippet;
    }
}