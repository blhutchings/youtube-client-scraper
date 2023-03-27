import { RequestFactory } from "../../requests/RequestFactory.js";
import { Parser } from "../Parser.js";
import { Thumbnail } from "../util/Thumbnail.js";
import { VideoPartsMap, VideoPartsParser } from "./VideoPartsParser.js";


export interface VideoMetadata {
    channelHandle?: string
    authorBadge?: string[]
    subscriberCountText?: string
    allowRatings?: boolean
    game?: Game
    topic?: Topic
}

export interface Game {
    title?: string;
    release?: string;
    boxArt?: Thumbnail[];
    id?: string;
}

export interface Topic {
    title?: string;
    art?: Thumbnail[];
    id?: string
}

interface VideoMetadataMap extends VideoPartsMap {
    richMetadataRowRenderer?: any
    badges?: any[]
}

export class VideoMetadataParser extends Parser {
    protected map(next: any, player: any, requestFactory: RequestFactory, map: any) {
        map.richMetadataRowRenderer = map.metadataRowContainer?.rows?.find((p: any) => p?.richMetadataRowRenderer)?.richMetadataRowRenderer
        map.badges = map?.videoSecondaryInfoRenderer?.owner?.videoOwnerRenderer?.badges
        return map;
    }

    protected extract(next: any, player: any, requestFactory: RequestFactory, map: VideoMetadataMap): VideoMetadata {
        let game = map.richMetadataRowRenderer?.contents?.find((p: any) => p?.richMetadataRenderer?.style === "RICH_METADATA_RENDERER_STYLE_BOX_ART")?.richMetadataRenderer
        let topic = map.richMetadataRowRenderer?.contents?.find((p: any) => p?.richMetadataRenderer?.style === "RICH_METADATA_RENDERER_STYLE_TOPIC")?.richMetadataRenderer
        return {
            channelHandle: map.microformat?.ownerProfileUrl?.match(/@.*/)?.[0],
            authorBadge: map.badges?.map((b: any) => b?.metadataBadgeRenderer?.tooltip),
            subscriberCountText: map?.videoSecondaryInfoRenderer?.owner?.videoOwnerRenderer?.subscriberCountText?.simpleText,
            allowRatings: map.videoDetails?.allowRatings,
            game: game ? {
                title: game?.title?.simpleText,
                release: game?.subtitle?.simpleText,
                boxArt: game?.thumbnail?.thumbnails,
                id: game?.endpoint?.browseEndpoint?.browseId
            } : undefined,
            topic: topic ? {
                title: topic?.title?.runs[0]?.text,
                art: topic?.thumbnail?.thumbnails,
                id: topic?.endpoint?.browseEndpoint?.browseId
            } : undefined
        }
    }
}
