import { YouTubeClient } from "../YouTubeClient.js";
import { Parser } from "../parsers/Parser.js";
import { YouTubeRequest } from "./YouTubeRequest.js";
import VideoNextRequestBody from "./bodies/VideoNextRequestBody.js";


export class VideoNextRequest extends YouTubeRequest {
    protected parser: Parser;
    execute() {
        this.client.get()
    }
}