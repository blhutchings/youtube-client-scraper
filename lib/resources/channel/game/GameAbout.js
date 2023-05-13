export class Resource$GameAbout {
    static parse(data) {
        let GameAbout = {};
        GameAbout['description'] = data?.about?.description?.simpleText;
        GameAbout['publishedAt'] = data?.about?.joinedDateText?.runs?.[1]?.text;
        const primaryLinks = data?.about?.primaryLinks;
        if (primaryLinks && primaryLinks.length > 0) {
            GameAbout['links'] = [];
            primaryLinks.forEach((link) => {
                const title = link?.title?.simpleText;
                const icon = link?.icon?.thumbnails?.[0]?.url;
                const url = link?.navigationEndpoint?.urlEndpoint?.url?.split('q=')?.[1];
                GameAbout['links']?.push({
                    title: title,
                    icon: icon,
                    url: (url !== 'undefined') ? decodeURIComponent(url) : undefined
                });
            });
        }
        return GameAbout;
    }
}
