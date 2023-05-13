export interface Schema$GameCard {
    title?: string;
    channelId?: string;
    boxArt?: string;
    liveViewersText?: string;
    isOfficialBoxArt?: boolean;
}
export declare class Resource$GameCard {
    static parse(gameDetailsRenderer: any): Schema$GameCard;
}
