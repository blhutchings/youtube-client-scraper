import { YouTubeConfigContext } from "../types/YouTubeConfig.js";
export type SearchParams$Continuation = {
    continuation: string;
};
export declare class Body$Continuation {
    context: YouTubeConfigContext['INNERTUBE_CONTEXT'];
    continuation: string;
    constructor(params: SearchParams$Continuation, config: YouTubeConfigContext);
}
