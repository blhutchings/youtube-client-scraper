import RequestFactory from "../../requests/RequestFactory.js";
import Parser from "../Parser.js";

export interface Thumbnail {
    url: string,
    width: number,
    height: number
}

export class Thumbnails extends Parser {
    private static urlRE = new RegExp(/\/(default|mqdefault|hqdefault|sddefault|maxresdefault).*\.jpg/);
    default?: Thumbnail = undefined;
    medium?: Thumbnail = undefined;
    high?: Thumbnail = undefined;
    standard?: Thumbnail = undefined;
    maxres?: Thumbnail = undefined;

    constructor(data: Thumbnail[]) {
        super();

        data?.forEach(thumbnail => {
            let match = thumbnail.url.match(Thumbnails.urlRE)
            if (match) {
                let url = match[0];
                let res = match[1];
                switch (res) {
                    case "default":
                        this.default = {
                            url: url,
                            width: 120,
                            height: 90
                        }
                        break;
                    case "mqdefault":
                        this.medium = {
                            url: url,
                            width: 320,
                            height: 180
                        }
                        break;
                    case "hqdefault":
                        this.high = {
                            url: url,
                            width: 480,
                            height: 360
                        }
                        break;
                    case "sddefault":
                        this.standard = {
                            url: url,
                            width: 640,
                            height: 480
                        }
                        break;
                    case "maxresdefault":
                        this.maxres = {
                            url: url,
                            width: 1280,
                            height: 720
                        }
                        break;
                }
            }
        })

    }
}
