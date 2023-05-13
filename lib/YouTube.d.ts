import YouTubeClient from "./clients/YouTubeClient.js";
import { SearchParams$Account } from "./requests/Request$Account.js";
import { SearchParams$Game } from "./requests/Request$Game.js";
import { SearchParams$Gaming } from "./requests/Request$Gaming.js";
import { SearchParams$Search } from "./requests/Request$Search.js";
import { SearchParams$Video } from "./requests/Request$Video.js";
export default class YouTube {
    private client;
    private readonly context;
    constructor(client: YouTubeClient);
    search(searchParams: SearchParams$Search, part?: string[]): Promise<import("./resources/search/Search.js").Schema$Search>;
    video(searchParams: SearchParams$Video, part?: string[]): Promise<import("./resources/watch/Video.js").Schema$Video>;
    account(searchParams: SearchParams$Account): Promise<import("./resources/channel/account/Account.js").Schema$Account>;
    game(searchParams: SearchParams$Game): Promise<import("./resources/channel/game/Game.js").Schema$Game>;
    gaming(searchParams: SearchParams$Gaming): Promise<import("./resources/channel/gaming/Gaming.js").Schema$Gaming>;
}
