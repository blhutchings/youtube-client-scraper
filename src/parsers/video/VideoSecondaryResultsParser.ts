import { RequestFactory } from "../../requests/RequestFactory.js";
import { Parser } from "../Parser.js";
import { VideoPartsMap } from "./VideoPartsParser.js";


export interface SecondaryResults {
    results?: SecondaryResults[]
    continue(): Promise<SecondaryResults> | undefined
}

export class VideoSecondaryResultsParser extends Parser {
    protected extract(next: any, player: any, requestFactory: RequestFactory, map: VideoPartsMap): any {
        return {
            results: map.secondaryResults?.map()
            //continue: requestFactory.createContinuationRequest();
        }
    }
}
