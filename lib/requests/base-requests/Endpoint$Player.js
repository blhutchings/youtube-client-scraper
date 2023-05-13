export default class Endpoint$Player {
    static post(body, client, context) {
        const response = client.got.post(`youtubei/${client.config.INNERTUBE_API_VERSION}/player`, {
            searchParams: {
                key: client.config.INNERTUBE_API_KEY,
                prettyPrint: false
            },
            headers: {
                referer: context.referer
            },
            body: body,
            parseJson: (text) => JSON.parse(text)
        });
        return response.json();
    }
}
