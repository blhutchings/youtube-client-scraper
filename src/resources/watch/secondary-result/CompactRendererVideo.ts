import { getFirstNumberInRuns } from "../../../util/ParserUtils.js";
import { Schema$CompactRenderer } from "./CompactRenderer.js";

export interface Schema$CompactRendererVideo extends Schema$CompactRenderer {
    type: "video";
    isShort?: boolean;
    isLive?: boolean;
    concurrentViewers?: number;
    liveContentType?: "stream" | "premiere";
}

export default class Resource$CompactRendererVideo {
    static parse(compactVideoRenderer: any, CompactRenderer: Schema$CompactRenderer): Schema$CompactRendererVideo {
        let CompactVideoRenderer: Schema$CompactRendererVideo = {
            ...CompactRenderer,
            type: "video"
        };
        CompactVideoRenderer['isShort'] = compactVideoRenderer?.thumbnailOverlays?.some((overlay: any) => overlay?.thumbnailOverlayTimeStatusRenderer?.style === "SHORTS")

        const liveContentBadge = compactVideoRenderer?.badges?.find((badge: any) => badge?.metadataBadgeRenderer?.label === "PREMIERE" || badge?.metadataBadgeRenderer?.label === "LIVE")?.metadataBadgeRenderer?.label        
        if (liveContentBadge === "PREMIERE") {
            CompactVideoRenderer['liveContentType'] = "premiere";
            CompactVideoRenderer['isLive'] = true;
        } else if (liveContentBadge === "LIVE") {
            CompactVideoRenderer['liveContentType'] = "stream";
            CompactVideoRenderer['isLive'] = true;
        };
        
        const wasStreamed = compactVideoRenderer?.publishedTimeText?.simpleText?.includes("Streamed");
        if (wasStreamed) {
            CompactVideoRenderer['liveContentType'] = "stream";
            CompactVideoRenderer['isLive'] = false;
        };
        CompactVideoRenderer['concurrentViewers'] = getFirstNumberInRuns(compactVideoRenderer?.viewCountText?.runs)
        return CompactVideoRenderer;
    }
}