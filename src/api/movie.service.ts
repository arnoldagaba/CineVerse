import tmdbClient from "./tmdbClient";

export type Movie = {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    vote_average: number;
};

export type MovieDetails = Movie & {
    genres: { id: number; name: string }[];
    runtime: number;
    videos: {
        results: {
            id: string;
            key: string;
            name: string;
            site: string;
            type: string;
        }[];
    };
    credits: {
        cast: {
            id: number;
            name: string;
            character: string;
            profile_path: string | null;
        }[];
    };
};

export async function fetchPopularMovies(page = 1) {
    const { data } = await tmdbClient.get("/movie/popular", {
        params: { page },
    });
    return data; // includes `results`, `total_pages`, etc.
}

export async function fetchUpcomingMovies(page = 1) {
    const { data } = await tmdbClient.get("/movie/upcoming", {
        params: { page },
    });
    return data;
}

export async function fetchTopRatedMovies(page = 1) {
    const { data } = await tmdbClient.get("/movie/top_rated", {
        params: { page },
    });
    return data;
}

export async function fetchMovieDetails(movieId: number) {
    const { data } = await tmdbClient.get(`/movie/${movieId}`, {
        params: {
            append_to_response: "videos,credits", // get trailers + cast together
        },
    });
    return data as MovieDetails;
}

export async function searchMovies(query: string, page = 1) {
    const { data } = await tmdbClient.get("/search/movie", {
        params: {
            query,
            page,
            include_adult: false,
        },
    });
    return data;
}

export async function fetchActorDetails(actorId: number) {
    const { data } = await tmdbClient.get(`/person/${actorId}`, {
        params: {
            append_to_response: "movie_credits",
        },
    });
    return data;
}
