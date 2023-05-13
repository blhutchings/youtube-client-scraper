export class Resource$GameTitle {
    static parse(data) {
        let GameTitle = {
            results: data.gameTitles || []
        };
        return GameTitle;
    }
}
