

export interface Schema$GameTitle {
    results: {
        title?: string,
        year?: string,
        mid?: string
    }[]
}


export class Resource$GameTitle {
    static parse(data: any) {
        let GameTitle: Schema$GameTitle = {
            results: data.gameTitles || []
        };
        return GameTitle;
    }
}