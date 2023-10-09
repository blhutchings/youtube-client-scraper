import { YouTubeConfig } from "../types/YouTubeConfig.js";

export type SearchParams$Continuation = {
    continuation: string
}

export class Body$Continuation {
    context: YouTubeConfig['INNERTUBE_CONTEXT'];
    continuation: string;
    constructor(params: SearchParams$Continuation, config: YouTubeConfig) {
        this.context = config.INNERTUBE_CONTEXT;
        this.continuation = params.continuation;
    }
}
