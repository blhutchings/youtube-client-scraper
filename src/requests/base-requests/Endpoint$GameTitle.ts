import YouTubeClient from "../../clients/YouTubeClient.js";
import YouTubeContext from "../../clients/YouTubeContext.js";

export default class Endpoint$GameTitle {
    static post<T = any>(body: string, client: YouTubeClient, context: YouTubeContext) {
        const response = client.got.post(`youtubei/${client.config.INNERTUBE_API_VERSION}/gaming/game_title`, {
            searchParams: {
                alt: "json",
                key: client.config.INNERTUBE_API_KEY
            },
            headers: {
                referer: context.referer
            },
            body: body,
            parseJson: (text: string) => JSON.parse(text)
        })
        return response.json<T>();
    }
}