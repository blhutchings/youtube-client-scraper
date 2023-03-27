import RequestFactory from "../../requests/RequestFactory.js"
import { VideoPartsMap } from "./VideoParts.js"


export interface SecondaryResults {
    results?: SecondaryResults[]
    continue(): Promise<SecondaryResults> | undefined
}

export class VideoSecondaryResultsParser {
    protected extract(next: any, player: any, requestFactory: RequestFactory, map: VideoPartsMap): any {
        return {
            results: map.secondaryResults?.map()
            //continue: requestFactory.createContinuationRequest();
        }
    }
}
