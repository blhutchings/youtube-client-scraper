import { Resource$Search } from "../resources/search/Search.js";
import ResourceParseError from "../util/ResourceParseError.js";
import Endpoint$Search from "./base-requests/Endpoint$Search.js";
const urlMap = (query) => {
    return `results?search_query=${query}`;
};
export async function Request$Search(searchParams, client, context) {
    context.currentUrl = urlMap(searchParams.query);
    const body = JSON.stringify(new Body$Search(searchParams, client.config));
    const data = await Endpoint$Search.post(body, client, context);
    try {
        return Resource$Search.parse(data, client, context);
    }
    catch (err) {
        throw new ResourceParseError(err.message, JSON.stringify(data), context);
    }
}
export class Body$Search {
    context;
    query;
    constructor(params, config) {
        this.context = config.INNERTUBE_CONTEXT;
        this.query = params.query;
    }
}
