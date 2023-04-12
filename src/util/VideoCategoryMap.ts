
type VideoCategoryMapping = {
    1: "Film & Animation",
    2: "Autos & Vehicles",
    10: "Music",
    15: "Pets & Animals",
    17: "Sports",
    18: "Short Movies",
    19: "Travel & Events",
    20: "Gaming",
    21: "Videoblogging",
    22: "People & Blogs",
    23: "Comedy",
    24: "Entertainment",
    25: "News & Politics",
    26: "Howto & Style",
    27: "Education",
    28: "Science & Technology",
    29: "Nonprofits & Activism",
    30: "Movies",
    31: "Anime/Animation",
    32: "Action/Adventure",
    33: "Classics",
    35: "Documentary",
    36: "Drama",
    37: "Family",
    38: "Foreign",
    39: "Horror",
    40: "Sci-Fi/Fantasy",
    41: "Thriller",
    42: "Shorts",
    43: "Shows",
    44: "Trailers"
}

export type VideoCategoryId = keyof VideoCategoryMapping & number
export type VideoCategory = VideoCategoryMapping[keyof VideoCategoryMapping]

class VideoCategoryMap {
    private categoryIdtoCategoryMap: Record<number, VideoCategory>
    private categorytoCategoryIdMap: Record<string, VideoCategoryId>

    constructor(categoryIdtoCategoryMap: VideoCategoryMapping) {
        this.categoryIdtoCategoryMap = categoryIdtoCategoryMap;
        let categorytoCategoryIdMapTemp: any = {}
        for (const [key, value] of Object.entries(categoryIdtoCategoryMap)) {
            categorytoCategoryIdMapTemp[(value as VideoCategory)] = Number(key);
        }
        this.categorytoCategoryIdMap = categorytoCategoryIdMapTemp;
    }

    categoryIdtoCategory(id: number): VideoCategory | undefined {
        return this.categoryIdtoCategoryMap[id]
    }

    categorytoCategoryId(category: string): VideoCategoryId | undefined {
        return this.categorytoCategoryIdMap[category]
    }
}

const categorytoCategoryId: VideoCategoryMapping = {
    1: "Film & Animation",
    2: "Autos & Vehicles",
    10: "Music",
    15: "Pets & Animals",
    17: "Sports",
    18: "Short Movies",
    19: "Travel & Events",
    20: "Gaming",
    21: "Videoblogging",
    22: "People & Blogs",
    23: "Comedy",
    24: "Entertainment",
    25: "News & Politics",
    26: "Howto & Style",
    27: "Education",
    28: "Science & Technology",
    29: "Nonprofits & Activism",
    30: "Movies",
    31: "Anime/Animation",
    32: "Action/Adventure",
    33: "Classics",
    35: "Documentary",
    36: "Drama",
    37: "Family",
    38: "Foreign",
    39: "Horror",
    40: "Sci-Fi/Fantasy",
    41: "Thriller",
    42: "Shorts",
    43: "Shows",
    44: "Trailers"
}

export const videoCategoryMap = new VideoCategoryMap(categorytoCategoryId)
