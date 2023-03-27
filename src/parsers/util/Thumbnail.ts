import { RequestFactory } from "../../requests/RequestFactory.js"
import { Parser } from "../Parser.js"


export interface Thumbnails {
    default?: Thumbnail
    medium?: Thumbnail
    high?: Thumbnail
    standard?: Thumbnail
    maxres?: Thumbnail
}

export interface Thumbnail {
    url: string,
    width: number,
    height: number
}


export class ThumbnailParser extends Parser {
    private static urlRE = new RegExp(/.*\/(.*).jpg/);


    extract(next: any, player: any, requestFactory: RequestFactory, thumbnails: Thumbnail[]) {
        let data: Thumbnails = {
            default: undefined,
            medium: undefined,
            high: undefined,
            standard: undefined,
            maxres: undefined
        }

        thumbnails?.forEach(thumbnail => {
            let match = thumbnail.url.match(ThumbnailParser.urlRE)
            if (match) {
                let url = match[0];
                let res = match[1];
                switch (res) {
                    case "default":
                        data.default = {
                            url: url,
                            width: 120,
                            height: 90
                        }
                        break;
                    case "mqdefault":
                        data.medium = {
                            url: url,
                            width: 320,
                            height: 180
                        }
                        break;
                    case "hqdefault":
                        data.high = {
                            url: url,
                            width: 480,
                            height: 360
                        }
                        break;
                    case "sddefault":
                        data.standard = {
                            url: url,
                            width: 640,
                            height: 480
                        }
                        break;
                    case "maxresdefault":
                        data.maxres = {
                            url: url,
                            width: 1280,
                            height: 720
                        }
                        break;
                }
            }
        })
        return data;
    }
}
