import Resource$RichItemRenderer from "../../common/RichItemRenderer.js";
import { Map$Game } from "./Game.js";

export interface Schema$GameOfficial {
	fromGame?: any[]
	fromPublisher?: any[]
	fromDeveloper?: any[]
}

export class Resource$GameOfficial {
	static parse(data: Map$Game): Schema$GameOfficial {
		const GameOffical: Schema$GameOfficial = {}

		data.official?.forEach(element => {
			const shelve = element.itemSectionRenderer.contents[0].shelfRenderer.title.runs[0].text;
			if (shelve === "From the game") {
				const content: any[] = element.itemSectionRenderer.contents[0].shelfRenderer.content.horizontalListRenderer.items
				GameOffical['fromGame'] = content.flatMap((item: any) => {
					return item.gridVideoRenderer ? Resource$RichItemRenderer.parse(item.gridVideoRenderer, 'videos') : []
				})
			} else if (shelve === "From the publishers") {
				const content: any[] = element.itemSectionRenderer.contents[0].shelfRenderer.content.horizontalListRenderer.items
				GameOffical['fromPublisher'] = content.flatMap((item: any) => {
					return item.gridVideoRenderer ? Resource$RichItemRenderer.parse(item.gridVideoRenderer, 'videos') : []
				})
			} else if (shelve === "From the developers") {
				const content: any[] = element.itemSectionRenderer.contents[0].shelfRenderer.content.horizontalListRenderer.items
				GameOffical['fromDeveloper'] = content.flatMap((item: any) => {
					return item.gridVideoRenderer ? Resource$RichItemRenderer.parse(item.gridVideoRenderer, 'videos') : []
				})
			}
		});

		return GameOffical
	}
}