import { useFavorites } from "@/hooks/useFavorites";
import MovieCard from "@/components/Movie/MovieCard";

const Favorites = () => {
    const { state } = useFavorites();
    const favorites = state.movies;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Your favorite movies</h1>

            {favorites.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">
                    You have no favorite movies yet.
                </p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {favorites.map((movie) => (
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
            )}
        </div>
    );
};

export default Favorites;
