import YouTubeContext from "../clients/YouTubeContext.js";
import { YouTubeClientScraperError } from "./YouTubeClientScraperError.js";

export default class ResourceParseError extends YouTubeClientScraperError {
    constructor(message: string, data: string, context: YouTubeContext) {
        super();
        this.message = message;
        this.cause = {
            context: context,
            data: data
        }
    }

}