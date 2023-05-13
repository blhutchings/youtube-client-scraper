export default class ResourceParseError extends Error {
    constructor(message, data, context) {
        super();
        this.message = message;
        this.cause = {
            context: context,
            data: data
        };
    }
}
