export class Resource$GameCard {
    static parse(gameDetailsRenderer) {
        let GamingGameCard = {};
        GamingGameCard['title'] = gameDetailsRenderer.title.simpleText;
        GamingGameCard['channelId'] = gameDetailsRenderer.endpoint.browseEndpoint.browseId;
        GamingGameCard['boxArt'] = gameDetailsRenderer.boxArt.thumbnails[0];
        GamingGameCard['liveViewersText'] = gameDetailsRenderer.liveViewersText?.runs[0].text || "0";
        GamingGameCard['isOfficialBoxArt'] = gameDetailsRenderer.isOfficialBoxArt;
        return GamingGameCard;
    }
}
