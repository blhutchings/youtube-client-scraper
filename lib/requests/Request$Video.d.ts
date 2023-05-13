import YouTubeClient from "../clients/YouTubeClient.js";
import YouTubeContext from "../YouTubeContext.js";
export type SearchParams$Video = {
    videoId: string;
    playlistId?: string;
    index?: number;
    params?: string;
};
export declare function Request$Video(searchParams: SearchParams$Video, client: YouTubeClient, context: YouTubeContext): Promise<import("../resources/watch/Video.js").Schema$Video>;
