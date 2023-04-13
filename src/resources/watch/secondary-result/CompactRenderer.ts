import YouTubeClient from "../../../clients/YouTubeClient.js";
import YouTubeContext from "../../../YouTubeContext.js";
import { Resource$ThumbnailDetails, Schema$Thumbnail } from "../../common/ThumbnailDetails.js";
import { getNumber, hmsToSeconds, getChannelHandle } from "../../../util/ParserUtils.js";
import Resource$CompactRendererMovie from "./CompactRendererMovie.js";
import Resource$CompactRendererPlaylist from "./CompactRendererPlaylist.js";
import Resource$CompactRendererVideo from "./CompactRendererVideo.js";


export interface Schema$CompactRenderer {    
    // General
    type?: string
    videoId?: string;
    title?: string;
    thumbnails?: Resource$ThumbnailDetails;
    publishedTimeText?: string;
    viewCount?: number;
    length?: number;
    badges?: string[];

    channelTitle?: string
    channelThumbnail?: Schema$Thumbnail;
    ownerBadge?: string;
    channelId?: string;
    channelHandle?: string;
} 

export default class Resource$CompactRenderer {
    static parse(compactUnknownRenderer: any, client: YouTubeClient, context: YouTubeContext) {
        const key = Object.keys(compactUnknownRenderer)[0];
        const renderer = compactUnknownRenderer[key];

        let CompactRenderer: Schema$CompactRenderer = {};
            
        CompactRenderer['type'] = undefined;
        CompactRenderer['videoId'] = renderer?.navigationEndpoint?.watchEndpoint?.videoId
        CompactRenderer['title'] = renderer?.title?.simpleText;
        CompactRenderer['thumbnails'] = Resource$ThumbnailDetails.parse(renderer?.thumbnail?.thumbnails);
        CompactRenderer['publishedTimeText'] = renderer?.publishedTimeText?.simpleText;
        CompactRenderer['viewCount'] = getNumber(renderer?.viewCountText?.simpleText);
        CompactRenderer['length'] = hmsToSeconds(renderer?.lengthText?.simpleText)
        CompactRenderer['badges'] = renderer?.badges?.map((item: any) => item?.metadataBadgeRenderer?.label);

        CompactRenderer['channelTitle'] = renderer?.longBylineText?.runs?.[0]?.text;
        CompactRenderer['channelThumbnail'] = renderer?.channelThumbnail?.thumbnails
        CompactRenderer['ownerBadge'] = renderer?.ownerBadges?.[0]?.metadataBadgeRenderer?.tooltip;
        CompactRenderer['channelId'] = renderer?.longBylineText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId
        CompactRenderer['channelHandle'] = getChannelHandle(renderer?.longBylineText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.canonicalBaseUrl)

        if (key === "compactVideoRenderer") {
            return Resource$CompactRendererVideo.parse(renderer, CompactRenderer)
        } else if (key === "compactPlaylistRenderer" || key === "compactRadioRenderer") {
            return Resource$CompactRendererPlaylist.parse(compactUnknownRenderer, CompactRenderer)
        } else if (key === "compactMovieRenderer") {
            return Resource$CompactRendererMovie.parse(renderer, CompactRenderer);
        } else if(key !== "continuationItemRenderer") {
            console.warn("Resource$VideoSecondaryResults - Unknown key, please report this issue", compactUnknownRenderer, context)
        }
        return undefined;
    }
}


