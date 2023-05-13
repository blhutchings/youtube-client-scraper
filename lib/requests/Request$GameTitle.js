import { Resource$GameTitle } from "../resources/gaming/GameTitle.js";
import ResourceParseError from "../util/ResourceParseError.js";
import Endpoint$GameTitle from "./base-requests/Endpoint$GameTitle.js";
export async function Request$GameTitle(searchParams, client, context) {
    const body = JSON.stringify(new Body$GameTitle(searchParams, client.config));
    const data = await Endpoint$GameTitle.post(body, client, context);
    try {
        return Resource$GameTitle.parse(data);
    }
    catch (err) {
        throw new ResourceParseError(err.message, JSON.stringify(data), context);
    }
}
export class Body$GameTitle {
    context;
    userInput;
    constructor(params, config) {
        this.context = config.INNERTUBE_CONTEXT;
        this.userInput = params.query;
    }
}
