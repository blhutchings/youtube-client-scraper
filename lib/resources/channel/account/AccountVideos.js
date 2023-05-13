import Resource$RichItemRenderer from "../../common/RichItemRenderer.js";
export default class Resource$AccountVideos {
    static parse(data, client, context) {
        let AccountVideos = {
            continue: async () => { return undefined; }
        };
        AccountVideos['results'] = data.videos?.contents?.flatMap((content) => {
            if (content?.richItemRenderer?.content?.videoRenderer) {
                return Resource$RichItemRenderer.parse(content?.richItemRenderer?.content?.videoRenderer, 'videos');
            }
            else {
                return [];
            }
        });
        return AccountVideos;
    }
}
