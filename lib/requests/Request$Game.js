import { Resource$Game } from "../resources/channel/game/Game.js";
import ResourceParseError from "../util/ResourceParseError.js";
import Endpoint$Browse from "./base-requests/Endpoint$Browse.js";
const tabParams = {
    home: "EgRob21l",
    live: "EgRsaXZl",
    recent: "EgZyZWNlbnQ%3D",
    about: "EgVhYm91dA%3D%3D"
};
const urlMap = {
    home: (browseId) => `channel/${browseId}/home`,
    live: (browseId) => `channel/${browseId}/live`,
    recent: (browseId) => `channel/${browseId}/recent`,
    about: (browseId) => `channel/${browseId}/about`
};
export async function Request$Game(searchParams, client, context) {
    context.currentUrl = urlMap[searchParams.tab](searchParams.browseId);
    const body = JSON.stringify(new Body$Game(searchParams, client.config));
    const data = await Endpoint$Browse.post(body, client, context);
    try {
        return Resource$Game.parse(data, client, context);
    }
    catch (err) {
        throw new ResourceParseError(err.message, JSON.stringify(data), context);
    }
}
export class Body$Game {
    context;
    browseId;
    params;
    constructor(params, config) {
        this.context = config.INNERTUBE_CONTEXT;
        this.browseId = params.browseId;
        this.params = tabParams[params.tab];
    }
}
