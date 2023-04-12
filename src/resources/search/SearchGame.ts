
export interface Schema$SearchGame {
    title: string;
    channelId: string;
}

export class Resource$SearchGame {
    static parse(watchCardRichHeaderRenderer: any): Schema$SearchGame {
        return {
            title: watchCardRichHeaderRenderer.title.simpleText,
            channelId: watchCardRichHeaderRenderer.titleNavigationEndpoint.browseEndpoint.browseId
        }
    }
}