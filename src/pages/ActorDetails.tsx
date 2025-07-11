import { useParams } from "react-router";
import { useActorDetails } from "@/hooks/useActorDetails";
import Loader from "@/components/Shared/Loader";
import MovieCard from "@/components/Movie/MovieCard";
import type { Movie } from "@/api/movie.service";

const ActorDetails = () => {
    const { id } = useParams<{ id: string }>();
    const actorId = Number(id);
    const { data: actor, isLoading } = useActorDetails(actorId);

    if (isLoading) return <Loader size="lg" />;

    return (
        <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-8">
            {/* Profile */}
            <div className="flex-shrink-0">
                {actor?.profile_path ? (
                    <img
                        src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                        alt={actor.name}
                        className="rounded=lg shadow-lg"
                    />
                ) : (
                    <div className="w-64 h-80 bg-gray-300 dark:bg-gray-700 rounded" />
                )}
            </div>

            {/* Details */}
            <div>
                <h1 className="text-3xl font-bold mb-2">{actor.name}</h1>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                    {actor.biography || "No biography available."}
                </p>

                {actor.movie_credits?.cast?.length > 0 && (
                    <>
                        <h2 className="text-2xl font-bold mb-4 mt-8">
                            Known For
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {actor.movie_credits.cast
                                .sort(
                                    (
                                        a: { popularity: number },
                                        b: { popularity: number }
                                    ) => b.popularity - a.popularity
                                )
                                .slice(0, 8)
                                .map((movie: Movie) => (
                                    <MovieCard
                                        key={movie.id}
                                        id={movie.id}
                                        title={movie.title}
                                        posterPath={movie.poster_path}
                                        releaseDate={movie.release_date}
                                        rating={movie.vote_average}
                                    />
                                ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ActorDetails;
