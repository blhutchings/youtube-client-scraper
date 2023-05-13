import { getNumber } from "../../../util/ParserUtils.js";
export default class Resource$AccountAbout {
    static parse(data) {
        let AccountAbout = {};
        AccountAbout['description'] = data?.about?.description?.simpleText;
        AccountAbout['totalChannelViews'] = getNumber(data?.about?.viewCountText?.simpleText);
        AccountAbout['publishedAt'] = data?.about?.joinedDateText?.runs?.[1]?.text;
        AccountAbout['country'] = data?.about?.country?.simpleText;
        const primaryLinks = data?.about?.primaryLinks;
        if (primaryLinks && primaryLinks.length > 0) {
            AccountAbout['links'] = [];
            primaryLinks.forEach((link) => {
                const title = link?.title?.simpleText;
                const icon = link?.icon?.thumbnails?.[0]?.url;
                const url = link?.navigationEndpoint?.urlEndpoint?.url?.split('q=')?.[1];
                AccountAbout['links']?.push({
                    title: title,
                    icon: icon,
                    url: (url !== 'undefined') ? decodeURIComponent(url) : undefined
                });
            });
        }
        return AccountAbout;
    }
}
