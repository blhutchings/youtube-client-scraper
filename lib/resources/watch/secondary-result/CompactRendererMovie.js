export default class Resource$CompactRendererMovie {
    static parse(compactMovieRenderer, CompactRenderer) {
        let CompactMovieRenderer = {
            ...CompactRenderer,
            type: "movie"
        };
        CompactMovieRenderer['useVerticalPoster'] = compactMovieRenderer?.useVerticalPoster;
        CompactMovieRenderer['metadataItems'] = compactMovieRenderer?.topMetadataItems?.[0]?.simpleText?.split("•").map((item) => item.trim());
        return CompactMovieRenderer;
    }
}
