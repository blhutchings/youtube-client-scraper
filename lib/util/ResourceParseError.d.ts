import YouTubeContext from "../YouTubeContext.js";
export default class ResourceParseError extends Error {
    constructor(message: string, data: string, context: YouTubeContext);
}
