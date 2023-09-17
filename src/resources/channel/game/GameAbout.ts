import { Map$Game } from "./Game.js";

export interface Schema$GameAbout {
    description?: string;
    publishedAt?: string;
    links?: {
        title?: string;
        url?: URL;
    }[]
}

export class Resource$GameAbout {
    static parse(data: Map$Game): Schema$GameAbout {
        let GameAbout: Schema$GameAbout = {};
		
        GameAbout['description'] = data?.about?.description?.simpleText
        GameAbout['publishedAt'] = data?.about?.joinedDateText?.runs?.[1]?.text;
		GameAbout['links'] = undefined;
        const links: any[] | undefined = data.about.links;

		if (links && links.length > 0) {
            GameAbout['links'] = [];
            links.forEach((link: any) => {
				const innerLink = link.channelExternalLinkViewModel
                const title = innerLink.title.content;
                const url = "https://" + innerLink.link.content;

                GameAbout['links']?.push({
                    title: title,
                    url: new URL(url)
                })
            })
        }

        return GameAbout
    }
}