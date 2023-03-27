import { RequestFactory } from "../requests/RequestFactory.js";

export abstract class Parser {
    parse(next: any, player: any, requestFactory: RequestFactory, map?: any) {
        let mapped = this.map(next, player, requestFactory, map)
        let extracted = this.extract(next, player, requestFactory, mapped)
        return this.filter(extracted)
    }

    // Removes properties that are undefined
    private filter(obj: any): any {
        Object.keys(obj).forEach(key => obj[key] === undefined ? delete obj[key] : {});
        return Object.keys(obj).length === 0 ? undefined : obj
    }

    // Used if you want to shorted property chains and map them to a interface
    protected map(next: any, player: any, requestFactory: RequestFactory, map: any): any {
        return map; 
    }

    protected abstract extract(next: any, player: any, requestFactory: RequestFactory, map: any): any;
}