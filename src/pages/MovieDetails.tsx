import { useParams } from "react-router";
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

    return (
        <div className="flex flex-col max-w-6xl mx-auto p-4">
            {/* BACKDROP */}
            {movie?.backdrop_path && (
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
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                    alt={movie?.title}
                    className="w-64 rounded-lg shadow-lg mx-auto md:mx-0"
                />

                {/* DETAILS */}
                <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-2">{movie?.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                        {formatDate(movie?.release_date)} &#x2022;{" "}
                        {movie?.runtime} min
                    </p>

                    <p className="mb-4">
                        {movie?.genres.map((g) => g.name).join(", ")}
                    </p>

                    <p className="mb-6 text-gray-800 dark:text-gray-200">
                        {movie?.overview}
                    </p>

                    <button
                        onClick={() =>
                            dispatch({
                                type: isFavorite ? "REMOVE" : "ADD",
                                payload: isFavorite ? movieId : movie,
                            })
                        }
                        className={`px-6 py-2 rounded bg-${
                            isFavorite ? "red" : "blue"
                        }-600 text-white`}
                    >
                        {isFavorite
                            ? "Remove from favorites"
                            : "Add to favorites"}
                    </button>
                </div>
            </div>

            {/* CAST */}
            {/* @ts-expect-error movie.videos may be missing type info */}
            {movie?.credits?.cast?.length > 0 && (
                <div className="mt-10">
                    <h3 className="text-2xl font-bold mb-4">Cast</h3>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                        {movie?.credits.cast.slice(0, 10).map((actor) => (
                            <div className="text-center" key={actor.id}>
                                {actor.profile_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                                        alt={actor.name}
                                        className="rounded-full w-24 h-24 object-cover mx-auto mb-2"
                                    />
                                ) : (
                                    <div className="w-24 h-24 rounded-full bg-gray-400 mx-auto mb-2" />
                                )}
                                <p className="text-sm font-semibold">
                                    {actor.name}
                                </p>
                                <p className="text-xs text-gray-600">
                                    {actor.character}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* TRAILERS */}
            {/* @ts-expect-error movie.videos may be missing type info */}
            {movie?.videos.results.length > 0 && (
                <div className="mt-10">
                    <h3 className="text-2xl font-bold mb-4">Trailers</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {movie?.videos.results
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
                                />
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieDetails;
