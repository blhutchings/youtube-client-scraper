export class Resource$SearchGame {
    static parse(watchCardRichHeaderRenderer) {
        return {
            title: watchCardRichHeaderRenderer.title.simpleText,
            channelId: watchCardRichHeaderRenderer.titleNavigationEndpoint.browseEndpoint.browseId
        };
    }
}
