import YouTubeClientState from "./YouTubeClientState.js";
import YouTubeHTTPClient from "./YouTubeHTTPClient.js";
import YouTubeConfigExtractor from "./parsers/YouTubeConfigExtractor.js";

export default class YouTubeClient {
    private httpClient: YouTubeHTTPClient
    private state: YouTubeClientState

    private constructor(httpClient: YouTubeHTTPClient, state: YouTubeClientState) {
        this.httpClient = httpClient
        this.state = state;
    }

    static async createClient(): Promise<YouTubeClient> {
        const httpClient = new YouTubeHTTPClient();
        const homepage = await httpClient.get('');
        const config = YouTubeConfigExtractor.extract(homepage.body)

        const clientState = new YouTubeClientState(config)

        return new YouTubeClient(httpClient, clientState);
    }


    async video(videoId: string) {
        this.state.transition(`watch?v=${videoId}`)
        //const res = this.httpClient.execute(new VideoNextRequest(this.httpClient, this.state))
    }

    async liveLive() {}
    async liveUpcoming() {}
    async liveRecent() {}

    async gamingGames() {}
    async gamingTrending() {}

    async gameLive(gameId: string) {}
    async gameRecent(gameId: string) {}
    async gamePlaylists(gameId: string) {}
    async gameOfficial(gameId: string) {}
    async gameAbout(gameId: string) {}

    async channelVideos(channelId: string) {}
    async channelShorts(channelId: string) {}
    async channelLive(channelId: string) {}
    async channelPodcasts(channelId: string) {}
    async channelPlaylists(channelId: string) {}
    async channelCommunity(channelId: string) {}
    async channelStore(channelId: string) {}
    async channelChannels(channelId: string) {}
    async channelAbout(channelId: string) {}
    async channelSearch(channelId: string, search: string) {}
}