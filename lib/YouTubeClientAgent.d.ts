/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import http2 from "http2-wrapper";
export default class YouTubeClientAgent extends http2.Agent {
    private options;
    constructor(options?: http2.SecureClientSessionOptions);
    createConnection(): Promise<import("tls").TLSSocket>;
}
