import { Got } from "got"
import { YouTubeConfig } from "../types/YouTubeConfig.js"

export default interface YouTubeClient {
    readonly got: Got
    readonly config: YouTubeConfig
}