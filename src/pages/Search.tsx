import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchMovies } from "@/hooks/useSearchMovies";
import Loader from "@/components/Shared/Loader";
import MovieCard from "@/components/Movie/MovieCard";
import type { Movie } from "@/api/movie.service";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const debouncedQuery = useDebounce(searchTerm, 500);

    const { data, isLoading } = useSearchMovies(debouncedQuery, page);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                }}
                className="w-full p-3 rounded border border-gray-300 dark:bg-gray-800dark:border-gray-600 mb-6"
            />

            {isLoading && <Loader />}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {data?.results?.length > 0 ? (
                    data.results.map((movie: Movie) => (
                        <MovieCard
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            posterPath={movie.poster_path}
                            releaseDate={movie.release_date}
                            rating={movie.vote_average}
                        />
                    ))
                ) : debouncedQuery && !isLoading ? (
                    <p className="text-gray-600 dark:text-gray-400">
                        No results
                    </p>
                ) : null}
            </div>
        </div>
    );
};

export default Search;
