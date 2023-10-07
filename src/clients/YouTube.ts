import YouTubeClient from "./YouTubeClient.js";
import YouTubeContext from "./YouTubeContext.js";
import { SearchParams$Account, Request$Account } from "../requests/Request$Account.js";
import { SearchParams$Game, Request$Game } from "../requests/Request$Game.js";
import { SearchParams$Gaming, Request$Gaming } from "../requests/Request$Gaming.js";
import { SearchParams$Search, Request$Search } from "../requests/Request$Search.js";
import { SearchParams$Video, Request$Video } from "../requests/Request$Video.js";
import { Request$GameTitle, SearchParams$GameTitle } from "../requests/Request$GameTitle.js";

export default class YouTube {
    private client: YouTubeClient;
    
    private readonly context: YouTubeContext = {
        referer: "https://www.youtube.com/",
        currentUrl: "/"
    }

    constructor(client: YouTubeClient) {
        this.client = client;
    }

    search(searchParams: SearchParams$Search, part?: string[]) {
        return Request$Search(searchParams, this.client, { part, ...this.context })
    }

    video(searchParams: SearchParams$Video, part?: string[]) {
        return Request$Video(searchParams, this.client, { part, ...this.context })
    }

    account(searchParams: SearchParams$Account) {
        return Request$Account(searchParams, this.client, { ...this.context });
    }

    game(searchParams: SearchParams$Game) {
        return Request$Game(searchParams, this.client, { ...this.context });
    }

    gaming(searchParams: SearchParams$Gaming) {
        return Request$Gaming(searchParams, this.client, { ...this.context });
    }

    gameTitle(searchParams: SearchParams$GameTitle) {
        return Request$GameTitle(searchParams, this.client, { ...this.context });
    }

}