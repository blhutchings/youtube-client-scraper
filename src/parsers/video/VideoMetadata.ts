import RequestFactory from "../../requests/RequestFactory.js"
import { Thumbnail } from "../util/Thumbnail.js"
import { VideoPartsMap } from "./VideoParts.js"

export default class VideoMetadata {
    channelHandle?: string
    authorBadge?: string[]
    subscriberCountText?: string
    allowRatings?: boolean
    game?: {
        title?: string;
        release?: string;
        boxArt?: Thumbnail[];
        id?: string;
    }
    topic?: {
        title?: string;
        art?: Thumbnail[];
        id?: string
    }

    constructor(data: VideoPartsMap) {
        const map = VideoMetadata.map(data);

        this.channelHandle = map.microformat?.ownerProfileUrl?.match(/@.*/)?.[0];
        this.authorBadge = map.badges?.map((b: any) => b?.metadataBadgeRenderer?.tooltip);
        this.subscriberCountText = map?.videoSecondaryInfoRenderer?.owner?.videoOwnerRenderer?.subscriberCountText?.simpleText;
        this.allowRatings = map.videoDetails?.allowRatings;

        const game = map.richMetadataRowRenderer?.contents?.find((p: any) => p?.richMetadataRenderer?.style === "RICH_METADATA_RENDERER_STYLE_BOX_ART")?.richMetadataRenderer;
        const topic = map.richMetadataRowRenderer?.contents?.find((p: any) => p?.richMetadataRenderer?.style === "RICH_METADATA_RENDERER_STYLE_TOPIC")?.richMetadataRenderer;
        this.game = game ? {
            title: game?.title?.simpleText,
            release: game?.subtitle?.simpleText,
            boxArt: game?.thumbnail?.thumbnails,
            id: game?.endpoint?.browseEndpoint?.browseId
        } : undefined;
        this.topic = topic ? {
            title: topic?.title?.runs[0]?.text,
            art: topic?.thumbnail?.thumbnails,
            id: topic?.endpoint?.browseEndpoint?.browseId
        } : undefined;
    }

    private static map(data: VideoMetadataMap): VideoMetadataMap {
        data.richMetadataRowRenderer = data.metadataRowContainer?.rows?.find((p: any) => p?.richMetadataRowRenderer)?.richMetadataRowRenderer
        data.badges = data?.videoSecondaryInfoRenderer?.owner?.videoOwnerRenderer?.badges
        return data;
    }
}

interface VideoMetadataMap extends VideoPartsMap {
    richMetadataRowRenderer?: any
    badges?: any[]
}

