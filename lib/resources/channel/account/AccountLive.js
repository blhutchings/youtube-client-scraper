import Resource$RichItemRenderer from "../../common/RichItemRenderer.js";
export default class Resource$AccountLive {
    static parse(data, client, context) {
        let AccountLive = {
            continue: async () => { return undefined; }
        };
        AccountLive['results'] = data?.live.contents.flatMap((content) => {
            if (content.richItemRenderer?.content.videoRenderer) {
                return Resource$RichItemRenderer.parse(content.richItemRenderer.content.videoRenderer, 'live');
            }
            else {
                return [];
            }
        });
        return AccountLive;
    }
}
