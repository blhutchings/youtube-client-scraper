import { getChannelHandle } from "../../util/ParserUtils.js";
export default class Resource$VideoMetadata {
    static parse(data) {
        let VideoMetadata = {};
        const map = Resource$VideoMetadata.map(data);
        VideoMetadata['channelHandle'] = getChannelHandle(map.microformat?.ownerProfileUrl);
        VideoMetadata['channelBadge'] = map.badges?.map((b) => b?.metadataBadgeRenderer?.tooltip)?.[0];
        VideoMetadata['subscriberCountText'] = map?.videoSecondaryInfoRenderer?.owner?.videoOwnerRenderer?.subscriberCountText?.simpleText;
        VideoMetadata['allowRatings'] = map.videoDetails?.allowRatings;
        const game = map.richMetadataRowRenderer?.contents?.find((p) => p?.richMetadataRenderer?.style === "RICH_METADATA_RENDERER_STYLE_BOX_ART")?.richMetadataRenderer;
        const topic = map.richMetadataRowRenderer?.contents?.find((p) => p?.richMetadataRenderer?.style === "RICH_METADATA_RENDERER_STYLE_TOPIC")?.richMetadataRenderer;
        VideoMetadata['game'] = game && {
            title: game?.title?.simpleText,
            release: game?.subtitle?.simpleText,
            boxArt: game?.thumbnail?.thumbnails,
            id: game?.endpoint?.browseEndpoint?.browseId
        };
        VideoMetadata['topic'] = topic && {
            title: topic?.title?.runs[0]?.text,
            art: topic?.thumbnail?.thumbnails,
            id: topic?.endpoint?.browseEndpoint?.browseId
        };
        return VideoMetadata;
    }
    static map(data) {
        data.richMetadataRowRenderer = data.metadataRowContainer?.rows?.find((p) => p?.richMetadataRowRenderer)?.richMetadataRowRenderer;
        data.badges = data?.videoSecondaryInfoRenderer?.owner?.videoOwnerRenderer?.badges;
        return data;
    }
}
