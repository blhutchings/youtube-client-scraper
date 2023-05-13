import { Schema$CompactRenderer } from "./CompactRenderer.js";
export interface Schema$CompactRendererVideo extends Schema$CompactRenderer {
    type: "video";
    isShort?: boolean;
    isLive?: boolean;
    concurrentViewers?: number;
    liveContentType?: "stream" | "premiere";
}
export default class Resource$CompactRendererVideo {
    static parse(compactVideoRenderer: any, CompactRenderer: Schema$CompactRenderer): Schema$CompactRendererVideo;
}
