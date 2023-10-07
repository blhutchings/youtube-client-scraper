import http2 from "http2-wrapper";

export default class YouTubeClientAgent extends http2.Agent {
    private options: http2.SecureClientSessionOptions;

    constructor(options?: http2.SecureClientSessionOptions) {
        super();
        this.options = options ?? {};
    }

	async createConnection() {
		return http2.Agent.connect(new URL("https://www.youtube.com"), this.options)
    }
}


