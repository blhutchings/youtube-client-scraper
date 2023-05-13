import { getFirstNumberInRuns } from "../../../util/ParserUtils.js";
export default class Resource$CompactRendererVideo {
    static parse(compactVideoRenderer, CompactRenderer) {
        let CompactVideoRenderer = {
            ...CompactRenderer,
            type: "video"
        };
        CompactVideoRenderer['isShort'] = compactVideoRenderer?.thumbnailOverlays?.some((overlay) => overlay?.thumbnailOverlayTimeStatusRenderer?.style === "SHORTS");
        const liveContentBadge = compactVideoRenderer?.badges?.find((badge) => badge?.metadataBadgeRenderer?.label === "PREMIERE" || badge?.metadataBadgeRenderer?.label === "LIVE")?.metadataBadgeRenderer?.label;
        if (liveContentBadge === "PREMIERE") {
            CompactVideoRenderer['liveContentType'] = "premiere";
            CompactVideoRenderer['isLive'] = true;
        }
        else if (liveContentBadge === "LIVE") {
            CompactVideoRenderer['liveContentType'] = "stream";
            CompactVideoRenderer['isLive'] = true;
        }
        ;
        const wasStreamed = compactVideoRenderer?.publishedTimeText?.simpleText?.includes("Streamed");
        if (wasStreamed) {
            CompactVideoRenderer['liveContentType'] = "stream";
            CompactVideoRenderer['isLive'] = false;
        }
        ;
        CompactVideoRenderer['concurrentViewers'] = getFirstNumberInRuns(compactVideoRenderer?.viewCountText?.runs);
        return CompactVideoRenderer;
    }
}
