import { getNumber } from "../../../util/ParserUtils.js";
import { Map$Account } from "./Account.js";

export interface Schema$AccountAbout {
    description?: string;
    totalChannelViews?: number;
    publishedAt?: string;
    country?: string;
    links?: {
        title?: string;
        icon?: string;
        url?: string;
    }[]
}

export default class Resource$AccountAbout {
    static parse(data: Map$Account): Schema$AccountAbout {
        let AccountAbout: Schema$AccountAbout = {};

        AccountAbout['description'] = data?.about?.description?.simpleText;
        AccountAbout['totalChannelViews'] = getNumber(data?.about?.viewCountText?.simpleText);
        AccountAbout['publishedAt'] = data?.about?.joinedDateText?.runs?.[1]?.text
        AccountAbout['country'] = data?.about?.country?.simpleText;

        const primaryLinks: any[] | undefined = data?.about?.primaryLinks
        if (primaryLinks && primaryLinks.length > 0) {
            AccountAbout['links'] = [];
            primaryLinks.forEach((link: any) => {
                const title = link?.title?.simpleText;
                const icon = link?.icon?.thumbnails?.[0]?.url
                const url = link?.navigationEndpoint?.urlEndpoint?.url?.split('q=')?.[1]

                AccountAbout['links']?.push({
                    title: title,
                    icon: icon,
                    url: (url !== 'undefined') ? decodeURIComponent(url) : undefined
                })
            })
        }

        return AccountAbout;
    }
}
