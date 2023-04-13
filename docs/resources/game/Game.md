# Game Resource

This is the resource




## Request

Required parameters
* channelId - The channel ID of the specified game

* tab - The tab of the game page to be retrieved
  * "home"
  * "recent"
  * "live"
  * "about"




# Resource representation

If successful, this method returns a response body with the following structure:

```
{
    "id": string
    "snippet": {
        "title": string,
        "description": string,
        "metadata": string[];
        "badges": string[];
        "boxart": Thumbnail;
        "banner": Thumbnail;
    },
    "home": {
        "fromDeveloper": GameCard[];
    },
    "live": {
        "results": RichItemRenderer[];
        "continue": () => Promise<GameLive | undefined>;
    },
    "recent": {
        "results": RichItemRenderer[];
        "continue": () => Promise<RichItemRenderer | undefined>
    },
    "about": {
        "description": string;
        "publishedAt": string;
        "links": {
            "title": string;
            "icon": string;
            "url": string;
        }[]
    }
}
```