export interface Thumbnail {
    url: string,
    width: number,
    height: number
}

export class Thumbnails {
    private static regex = new RegExp(/\/(default|mqdefault|hqdefault|sddefault|maxresdefault).*\.jpg/);
    default?: Thumbnail;
    medium?: Thumbnail;
    high?: Thumbnail;
    standard?: Thumbnail;
    maxres?: Thumbnail;

    constructor(data: Thumbnail[]) {
        data?.forEach(thumbnail => {
            let match = thumbnail.url.match(Thumbnails.regex)
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
