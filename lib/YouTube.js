import { Request$Account } from "./requests/Request$Account.js";
import { Request$Game } from "./requests/Request$Game.js";
import { Request$Gaming } from "./requests/Request$Gaming.js";
import { Request$Search } from "./requests/Request$Search.js";
import { Request$Video } from "./requests/Request$Video.js";
export default class YouTube {
    client;
    context = {
        referer: "https://www.youtube.com/",
        currentUrl: "/"
    };
    constructor(client) {
        this.client = client;
    }
    search(searchParams, part) {
        return Request$Search(searchParams, this.client, { part, ...this.context });
    }
    video(searchParams, part) {
        return Request$Video(searchParams, this.client, { part, ...this.context });
    }
    account(searchParams) {
        return Request$Account(searchParams, this.client, { ...this.context });
    }
    game(searchParams) {
        return Request$Game(searchParams, this.client, { ...this.context });
    }
    gaming(searchParams) {
        return Request$Gaming(searchParams, this.client, { ...this.context });
    }
}
