import { Resource$Account } from "../resources/channel/account/Account.js";
import ResourceParseError from "../util/ResourceParseError.js";
import Endpoint$Browse from "./base-requests/Endpoint$Browse.js";
const tabParams = {
    videos: "EgZ2aWRlb3PyBgQKAjoA",
    live: "EgdzdHJlYW1z8gYECgJ6AA%3D%3D",
    about: "EgVhYm91dPIGBAoCEgA%3D"
};
export async function Request$Account(searchParams, client, context) {
    const body = JSON.stringify(new Body$Account(searchParams, client.config));
    const data = await Endpoint$Browse.post(body, client, context);
    try {
        return Resource$Account.parse(data, client, context);
    }
    catch (err) {
        throw new ResourceParseError(err.message, JSON.stringify(data), context);
    }
}
export class Body$Account {
    context;
    browseId;
    params;
    constructor(params, config) {
        this.context = config.INNERTUBE_CONTEXT;
        this.browseId = params.browseId;
        this.params = tabParams[params.tab];
    }
}
