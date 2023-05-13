export default class Endpoint$GameTitle {
    static post(body, client, context) {
        const response = client.got.post(`youtubei/${client.config.INNERTUBE_API_VERSION}/gaming/game_title`, {
            searchParams: {
                alt: "json",
                key: client.config.INNERTUBE_API_KEY
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
