import { Got } from "got"
import { YouTubeConfigContext } from "../types/YouTubeConfig.js"

export default interface YouTubeClient {
    readonly got: Got
    readonly config: YouTubeConfigContext
}