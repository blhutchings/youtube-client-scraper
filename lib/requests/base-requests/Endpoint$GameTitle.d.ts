import YouTubeClient from "../../clients/YouTubeClient.js";
import YouTubeContext from "../../YouTubeContext.js";
export default class Endpoint$GameTitle {
    static post<T = any>(body: string, client: YouTubeClient, context: YouTubeContext): import("got").CancelableRequest<T>;
}
