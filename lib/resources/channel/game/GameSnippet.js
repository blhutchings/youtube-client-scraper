export class Resource$GameSnippet {
    static parse(data) {
        let GameSnippet = {};
        GameSnippet['title'] = data?.header?.title?.simpleText;
        GameSnippet['description'] = data?.header?.description?.simpleText;
        GameSnippet['metadata'] = data?.header?.metadata?.runs?.filter((run) => !run.text.includes('•')).map((run) => run.text);
        GameSnippet['badges'] = data?.header?.badges?.map((item) => item.metadataBadgeRenderer?.label);
        GameSnippet['boxart'] = data?.header?.boxArt?.thumbnails[0].url.split('=')[0];
        GameSnippet['banner'] = data?.header?.banner?.thumbnails[0].url.split('=')[0];
        return GameSnippet;
    }
}
