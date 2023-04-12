/**
 * A thumbnail is an image representing a YouTube resource.
 */
export interface Schema$Thumbnail {
    /**
     * The thumbnail image's URL.
     */
    url?: string | null;
    /**
     * (Optional) Height of the thumbnail image.
     */
    height?: number | null;
    /**
     * (Optional) Width of the thumbnail image.
     */
    width?: number | null;
}

export interface Schema$ThumbnailDetails {
    default?: Schema$Thumbnail;
    medium?: Schema$Thumbnail;
    high?: Schema$Thumbnail;
    standard?: Schema$Thumbnail;
    maxres?: Schema$Thumbnail;
}

type ThumbnailQuality = "default" | "mqdefault" | "hqdefault" | "sddefault" | "maxresdefault"

export class Resource$ThumbnailDetails {
    private static regex = new RegExp(/.*\/(default|mqdefault|hqdefault|sddefault|maxresdefault|hq720).*\.jpg/);

    static parse(data: Schema$Thumbnail[]): Schema$ThumbnailDetails {
        let ThumbnailDetails: Schema$ThumbnailDetails = {};

        data?.forEach(thumbnail => {
            const match = thumbnail?.url?.match(Resource$ThumbnailDetails.regex)
            if (match) {
                const url = match[0];
                const res = match[1] as ThumbnailQuality;
                Resource$ThumbnailDetails.qualityMap[res](ThumbnailDetails, url)
            }
        })

        return ThumbnailDetails;
    }

    private static qualityMap = {
        "default": (ThumbnailDetails: Schema$ThumbnailDetails, url: string) => {
            ThumbnailDetails['default'] = {
                url: url,
                width: 120,
                height: 90
            }
        },
        "mqdefault": (ThumbnailDetails: any, url: any) => {
            ThumbnailDetails['medium'] = {
                url: url,
                width: 320,
                height: 180
            }
        },
        "hqdefault": (ThumbnailDetails: any, url: any) => {
            ThumbnailDetails['high'] = {
                url: url,
                width: 480,
                height: 360
            }
        },
        "sddefault": (ThumbnailDetails: any, url: any) => {
            ThumbnailDetails['standard'] = {
                url: url,
                width: 640,
                height: 480
            }
        },
        "maxresdefault": (ThumbnailDetails: any, url: any) => {
            ThumbnailDetails['maxres'] = {
                url: url,
                width: 1280,
                height: 720
            }
        },
        "hq720": (ThumbnailDetails: any, url: any) => {
            ThumbnailDetails['maxres'] = {
                url: url,
                width: 1280,
                height: 720
            }
        },
    }
}
