import { useParams } from "react-router";
import { Helmet } from "react-helmet-async";
import { useMovieDetails } from "@/hooks/useMovieDetails";
import { useFavorites } from "@/hooks/useFavorites";
import Loader from "@/components/Shared/Loader";
import { formatDate } from "@/utils/formatDate";

const MovieDetails = () => {
    const { id } = useParams<{ id: string }>();
    const movieId = Number(id);
    const { data: movie, isLoading } = useMovieDetails(movieId);

    const { state, dispatch } = useFavorites();
    const isFavorite = state.movies.some((m) => m.id === movieId);

    if (isLoading) return <Loader size="lg" />;

    if (!movie)
        return <div className="text-center py-10">Movie not found.</div>;

    // Helper for genres
    const genreNames = movie.genres?.map((g) => g.name).join(", ") || "N/A";
    // Helper for cast
    const cast = movie.credits?.cast || [];
    // Helper for videos
    const videos = movie.videos?.results || [];

    return (
        <div className="flex flex-col max-w-6xl mx-auto p-4">
            <div>
                <Helmet>
                    <title>{movie.title} | CineVerse</title>
                    <meta
                        name="description"
                        content={
                            movie.overview
                                ? movie.overview.slice(0, 150)
                                : "Movie details and information."
                        }
                    />
                    {movie.poster_path && (
                        <meta
                            property="og:image"
                            content={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        />
                    )}
                </Helmet>
                <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
            </div>

            {/* BACKDROP */}
            {movie.backdrop_path && (
                <div
                    className="relative h-96 mb-8 rounded-lg overflow-hidden"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="relative z-10 flex items-end h-full p-6 text-white">
                        <h1 className="text-4xl font-bold">{movie.title}</h1>
                    </div>
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-8">
                {/* POSTER */}
                {movie.poster_path ? (
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-64 rounded-lg shadow-lg mx-auto md:mx-0"
                    />
                ) : (
                    <div className="w-64 h-96 rounded-lg bg-gray-300 flex items-center justify-center text-gray-500 mx-auto md:mx-0">
                        No Image
                    </div>
                )}

                {/* DETAILS */}
                <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                        {formatDate(movie.release_date)} &#x2022;{" "}
                        {movie.runtime ? `${movie.runtime} min` : "N/A"}
                    </p>

                    <p className="mb-4">{genreNames}</p>

                    <p className="mb-6 text-gray-800 dark:text-gray-200">
                        {movie.overview || "No overview available."}
                    </p>

                    <button
                        onClick={() => {
                            if (isFavorite) {
                                dispatch({
                                    type: "REMOVE",
                                    payload: movieId,
                                });
                            } else {
                                dispatch({
                                    type: "ADD",
                                    payload: movie,
                                });
                            }
                        }}
                        aria-label={
                            isFavorite
                                ? "Remove from favorites"
                                : "Add to favorites"
                        }
                        className={`px-6 py-2 rounded ${
                            isFavorite ? "bg-red-600" : "bg-blue-600"
                        } text-white transition-colors`}
                    >
                        {isFavorite
                            ? "Remove from favorites"
                            : "Add to favorites"}
                    </button>
                </div>
            </div>

            {/* CAST */}
            {cast.length > 0 && (
                <div className="mt-10">
                    <h3 className="text-2xl font-bold mb-4">Cast</h3>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                        {cast.slice(0, 10).map((actor) => (
                            <div className="text-center" key={actor.id}>
                                <a
                                    href={`/actor/${actor.id}`}
                                    className="block group"
                                >
                                    {actor.profile_path ? (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                                            alt={actor.name}
                                            className="rounded-full w-24 h-24 object-cover mx-auto mb-2 group-hover:scale-105 transition-transform"
                                        />
                                    ) : (
                                        <div className="w-24 h-24 rounded-full bg-gray-400 flex items-center justify-center mx-auto mb-2 text-xs text-white">
                                            No Image
                                        </div>
                                    )}
                                    <p className="text-sm font-semibold group-hover:underline">
                                        {actor.name}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        {actor.character}
                                    </p>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* TRAILERS */}
            {videos.filter((v) => v.site === "YouTube" && v.type === "Trailer")
                .length > 0 && (
                <div className="mt-10">
                    <h3 className="text-2xl font-bold mb-4">Trailers</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {videos
                            .filter(
                                (v) =>
                                    v.site === "YouTube" && v.type === "Trailer"
                            )
                            .slice(0, 2)
                            .map((video) => (
                                <iframe
                                    key={video.id}
                                    width="100%"
                                    height="315"
                                    src={`https://www.youtube.com/embed/${video.key}`}
                                    title={video.name}
                                    allowFullScreen
                                    className="rounded-lg shadow"
                                ></iframe>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieDetails;
