class Resource$ThumbnailDetails {
    static regex = new RegExp(/.*\/(default|mqdefault|hqdefault|sddefault|maxresdefault|hq720).*\.jpg/);
    static parse(data) {
        let ThumbnailDetails = {};
        data?.forEach(thumbnail => {
            const match = thumbnail?.url?.match(Resource$ThumbnailDetails.regex);
            if (match) {
                const url = match[0];
                const res = match[1];
                Resource$ThumbnailDetails.qualityMap[res](ThumbnailDetails, url);
            }
        });
        return ThumbnailDetails;
    }
    static qualityMap = {
        "default": (ThumbnailDetails, url) => {
            ThumbnailDetails['default'] = {
                url: url,
                width: 120,
                height: 90
            };
        },
        "mqdefault": (ThumbnailDetails, url) => {
            ThumbnailDetails['medium'] = {
                url: url,
                width: 320,
                height: 180
            };
        },
        "hqdefault": (ThumbnailDetails, url) => {
            ThumbnailDetails['high'] = {
                url: url,
                width: 480,
                height: 360
            };
        },
        "sddefault": (ThumbnailDetails, url) => {
            ThumbnailDetails['standard'] = {
                url: url,
                width: 640,
                height: 480
            };
        },
        "maxresdefault": (ThumbnailDetails, url) => {
            ThumbnailDetails['maxres'] = {
                url: url,
                width: 1280,
                height: 720
            };
        },
        "hq720": (ThumbnailDetails, url) => {
            ThumbnailDetails['maxres'] = {
                url: url,
                width: 1280,
                height: 720
            };
        },
    };
}
export { Resource$ThumbnailDetails };
