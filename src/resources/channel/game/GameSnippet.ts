import { Map$Game } from "./Game.js";

export interface Schema$GameSnippet {
    title?: string;
    simpleDescription?: string;
    metadata?: string[];
    badges?: string[];
    boxart?: URL;
    banner?: URL;
}

export class Resource$GameSnippet {
    
    static parse(data: Map$Game): Schema$GameSnippet{
        let GameSnippet: Schema$GameSnippet = {};

        GameSnippet['title'] = data?.header?.title?.simpleText;
        GameSnippet['simpleDescription'] = data?.header?.description?.simpleText;
        GameSnippet['metadata'] = data?.header?.metadata?.runs?.filter((run: any) => !run.text.includes('•')).map((run: any) => run.text);
        GameSnippet['badges'] = data?.header?.badges?.map((item: any) => item.metadataBadgeRenderer?.label);
        GameSnippet['boxart'] = new URL(data?.header?.boxArt?.thumbnails[0].url.split('=')[0])
        GameSnippet['banner'] = new URL(data?.header?.banner?.thumbnails[0].url.split('=')[0])
    
        return GameSnippet;
    }
}