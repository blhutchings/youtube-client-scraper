import YouTubeContext from "../YouTubeContext.js";

export default class ResourceParseError extends Error {
    constructor(data: string, context: YouTubeContext) {
        super();
        this.cause = {
            context: context,
            data: data
        }
    }

}