export interface Schema$GameTitle {
    results: {
        title?: string;
        year?: string;
        mid?: string;
    }[];
}
export declare class Resource$GameTitle {
    static parse(data: any): Schema$GameTitle;
}
