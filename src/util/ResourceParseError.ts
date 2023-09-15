import YouTubeContext from "../YouTubeContext.js";

export default class ResourceParseError extends Error {
    constructor(message: string, data: string, context: YouTubeContext) {
        super();
        this.message = message;
        this.cause = {
            context: context,
            data: data
        }
    }

}