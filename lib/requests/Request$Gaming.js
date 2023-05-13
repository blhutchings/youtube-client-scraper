import { Resource$Gaming } from "../resources/channel/gaming/Gaming.js";
import ResourceParseError from "../util/ResourceParseError.js";
import Endpoint$Browse from "./base-requests/Endpoint$Browse.js";
const tabParams = {
    live: 'EgVnYW1lcw%3D%3D',
    trending: 'Egh0cmVuZGluZw%3D%3D',
};
const urlMap = {
    live: 'gaming/games',
    trending: 'gaming/trending'
};
export async function Request$Gaming(searchParams, client, context) {
    context.currentUrl = urlMap[searchParams.tab];
    const body = JSON.stringify(new Body$Gaming(searchParams, client.config));
    const data = await Endpoint$Browse.post(body, client, context);
    try {
        return Resource$Gaming.parse(data, client, context);
    }
    catch (err) {
        throw new ResourceParseError(err.message, JSON.stringify(data), context);
    }
}
export class Body$Gaming {
    context;
    browseId = "UCOpNcN46UbXVtpKMrmU4Abg";
    params;
    constructor(params, config) {
        this.context = config.INNERTUBE_CONTEXT;
        this.params = tabParams[params.tab];
    }
}
