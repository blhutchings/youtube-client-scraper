export class Body$Continuation {
    context;
    continuation;
    constructor(params, config) {
        this.context = config.INNERTUBE_CONTEXT;
        this.continuation = params.continuation;
    }
}
