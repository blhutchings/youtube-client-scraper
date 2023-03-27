import { Options } from "got";
import { YouTubeClient } from "../YouTubeClient.js";
import { Parser } from "../parsers/Parser.js";


export abstract class YouTubeRequest {
    protected client: YouTubeClient;
    protected options: Options;
    protected parser: Parser

    constructor(client: YouTubeClient, options: Options, parser: Parser) {
        this.client = client;
        this.options = options;
        this.parser = parser;
    }

    abstract execute(): any;
}