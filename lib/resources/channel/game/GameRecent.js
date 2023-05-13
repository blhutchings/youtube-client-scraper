import Resource$RichItemRenderer from "../../common/RichItemRenderer.js";
export class Resource$GameRecent {
    static parse(data) {
        let GameRecent = {
            continue: async () => { return undefined; }
        };
        GameRecent['results'] = data.recent?.flatMap((item) => {
            if (item.gridVideoRenderer) {
                return Resource$RichItemRenderer.parse(item.gridVideoRenderer, 'videos');
            }
            else {
                return [];
            }
        });
        return GameRecent;
    }
}
