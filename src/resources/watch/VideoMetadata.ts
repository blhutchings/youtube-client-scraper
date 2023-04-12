import { getChannelHandle } from "../../util/ParserUtils.js"
import { Schema$Thumbnail } from "../common/ThumbnailDetails.js"
import { Map$Video } from "./Video.js"

export interface Schema$VideoMetadata {
    channelHandle?: string
    channelBadge?: string
    subscriberCountText?: string
    allowRatings?: boolean
    game?: {
        title?: string;
        release?: string;
        boxArt?: Schema$Thumbnail[];
        id?: string;
    }
    topic?: {
        title?: string;
        art?: Schema$Thumbnail[];
        id?: string
    }
}

export interface Map$VideoMetadata extends Map$Video {
    richMetadataRowRenderer?: any
    badges?: any[]
}

export default class Resource$VideoMetadata {

    static parse(data: Map$Video) {
        let VideoMetadata: Schema$VideoMetadata = {};
        const map = Resource$VideoMetadata.map(data);

        VideoMetadata['channelHandle'] = getChannelHandle(map.microformat?.ownerProfileUrl);
        VideoMetadata['channelBadge'] = map.badges?.map((b: any) => b?.metadataBadgeRenderer?.tooltip)?.[0];
        VideoMetadata['subscriberCountText'] = map?.videoSecondaryInfoRenderer?.owner?.videoOwnerRenderer?.subscriberCountText?.simpleText;
        VideoMetadata['allowRatings'] = map.videoDetails?.allowRatings;

        const game = map.richMetadataRowRenderer?.contents?.find((p: any) => p?.richMetadataRenderer?.style === "RICH_METADATA_RENDERER_STYLE_BOX_ART")?.richMetadataRenderer;
        const topic = map.richMetadataRowRenderer?.contents?.find((p: any) => p?.richMetadataRenderer?.style === "RICH_METADATA_RENDERER_STYLE_TOPIC")?.richMetadataRenderer;
        
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

    private static map(data: Map$VideoMetadata): Map$VideoMetadata {
        data.richMetadataRowRenderer = data.metadataRowContainer?.rows?.find((p: any) => p?.richMetadataRowRenderer)?.richMetadataRowRenderer
        data.badges = data?.videoSecondaryInfoRenderer?.owner?.videoOwnerRenderer?.badges
        return data;
    }
}


