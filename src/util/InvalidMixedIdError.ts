import { YouTubeClientScraperError } from "./YouTubeClientScraperError.js";

/**
 * Used for when endpoints can return different Resource types based on the id.
 * For Example, Both VideoGame Channels and Standard User Channels are retrieved by the same innertube endpoint
 */
export default class InvalidMixedIdError extends YouTubeClientScraperError {
    constructor(message: string, cause: string) {
        super();
        this.message = message;
		this.cause = cause
    }

}