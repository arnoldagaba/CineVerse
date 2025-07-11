import { useState, useRef, useEffect, useCallback } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchMovies } from "@/hooks/useSearchMovies";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useMovieSuggestions } from "@/hooks/useMovieSuggestions";
import Loader from "@/components/Shared/Loader";
import MovieCard from "@/components/Movie/MovieCard";
import type { Movie } from "@/api/movie.service";

const SKELETON_COUNT = 8;

const YEARS = Array.from({ length: 2026 - 1980 }, (_, i) => 1980 + i).reverse();
const RATINGS = [0, 2, 4, 6, 7, 8, 9];

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [year, setYear] = useState("");
    const [minRating, setMinRating] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const debouncedQuery = useDebounce(searchTerm, 500);

    const { data, isLoading, isError, error, isFetching } = useSearchMovies(
        debouncedQuery,
        page
    );
    const { suggestions } = useMovieSuggestions(searchTerm);

    // Helper for pagination
    const totalPages = data?.total_pages || 1;
    const hasResults = data?.results?.length > 0;
    const totalResults = data?.total_results || 0;

    // Focus input on mount
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // Infinite scroll callback
    const loadMore = useCallback(() => {
        if (page < totalPages && !isFetching && !isLoading) {
            setPage((p) => p + 1);
        }
    }, [page, totalPages, isFetching, isLoading]);

    useInfiniteScroll(loadMore, page < totalPages, isFetching || isLoading);

    // Keyboard accessibility
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Escape") {
            setSearchTerm("");
            setPage(1);
        } else if (e.key === "Enter") {
            setPage(1);
        }
    };

    const [allResults, setAllResults] = useState<Movie[]>([]);
    const resultsRef = useRef<HTMLDivElement>(null);
    const [announce, setAnnounce] = useState("");

    // Combine all loaded results for infinite scroll
    useEffect(() => {
        if (page === 1) {
            setAllResults(data?.results || []);
        } else if (data?.results) {
            setAllResults((prev) => [...prev, ...data.results]);
        }
    }, [data, page]);

    // Reset results and scroll when search changes
    useEffect(() => {
        setPage(1);
        setTimeout(() => {
            resultsRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [debouncedQuery]);

    // Announce result count for screen readers
    useEffect(() => {
        if (debouncedQuery && !isLoading && !isError) {
            setAnnounce(
                `Found ${totalResults} result${totalResults !== 1 ? "s" : ""}`
            );
        } else if (
            isError &&
            (error as Error)?.message?.toLowerCase().includes("rate limit")
        ) {
            setAnnounce("API rate limit reached. Please try again later.");
        } else {
            setAnnounce("");
        }
    }, [debouncedQuery, isLoading, isError, totalResults, error]);

    // Filtered results
    const filteredResults = allResults.filter((movie) => {
        const matchesYear = year ? movie.release_date?.startsWith(year) : true;
        const matchesRating = movie.vote_average >= minRating;
        return matchesYear && matchesRating;
    });

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-4 items-center">
                <label className="text-gray-700 dark:text-gray-300">
                    Year:
                    <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="ml-2 p-2 rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-600"
                    >
                        <option value="">All</option>
                        {YEARS.map((y) => (
                            <option key={y} value={y}>
                                {y}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="text-gray-700 dark:text-gray-300">
                    Min Rating:
                    <select
                        value={minRating}
                        onChange={(e) => setMinRating(Number(e.target.value))}
                        className="ml-2 p-2 rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-600"
                    >
                        {RATINGS.map((r) => (
                            <option key={r} value={r}>
                                {r}+
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <label htmlFor="search-input" className="sr-only">
                Search movies
            </label>
            <div className="relative mb-6">
                <input
                    id="search-input"
                    ref={inputRef}
                    type="text"
                    placeholder="Search movies..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() =>
                        setTimeout(() => setShowSuggestions(false), 150)
                    }
                    onKeyDown={handleKeyDown}
                    className="w-full p-3 rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-600 mb-0 pr-10"
                    autoComplete="off"
                    aria-label="Search movies"
                />
                {searchTerm && (
                    <button
                        type="button"
                        aria-label="Clear search"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        onClick={() => {
                            setSearchTerm("");
                            setPage(1);
                            inputRef.current?.focus();
                        }}
                    >
                        ×
                    </button>
                )}
                {/* Suggestions dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                    <ul className="absolute z-10 left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow mt-1 max-h-64 overflow-auto">
                        {suggestions.map((movie) => (
                            <li
                                key={movie.id}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                                onMouseDown={() => {
                                    setSearchTerm(movie.title);
                                    setShowSuggestions(false);
                                    inputRef.current?.focus();
                                }}
                            >
                                {movie.title}{" "}
                                <span className="text-xs text-gray-400">
                                    ({movie.release_date?.slice(0, 4)})
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div aria-live="polite" className="sr-only">
                {announce}
            </div>
            {/* Show total results */}
            {debouncedQuery && !isLoading && !isError && (
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                    Found <span className="font-semibold">{totalResults}</span>{" "}
                    result{totalResults !== 1 ? "s" : ""}
                </p>
            )}

            {/* Loader placement & skeletons */}
            <div
                ref={resultsRef}
                className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
                {isLoading && page === 1 ? (
                    Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                        <div
                            key={i}
                            className="animate-pulse bg-gray-200 dark:bg-gray-700 h-72 rounded"
                        />
                    ))
                ) : hasResults ? (
                    filteredResults.length > 0 ? (
                        filteredResults.map((movie: Movie) => (
                            <MovieCard
                                key={movie.id}
                                id={movie.id}
                                title={movie.title}
                                posterPath={movie.poster_path}
                                releaseDate={movie.release_date}
                                rating={movie.vote_average}
                            />
                        ))
                    ) : (
                        <p className="text-gray-600 dark:text-gray-400 col-span-full text-center">
                            No results match your filters.
                        </p>
                    )
                ) : debouncedQuery && !isLoading && !isError ? (
                    <p className="text-gray-600 dark:text-gray-400 col-span-full text-center">
                        No results
                    </p>
                ) : !debouncedQuery && !isLoading && !isError ? (
                    <p className="text-gray-500 dark:text-gray-400 col-span-full text-center">
                        Start typing to search for movies.
                    </p>
                ) : null}
            </div>

            {/* Infinite scroll sentinel */}
            {hasResults && page < totalPages && (
                <div
                    id="infinite-sentinel"
                    className="h-8"
                    aria-label="Loading more results"
                />
            )}

            {/* Loader for more pages */}
            {isLoading && page > 1 && (
                <div className="flex justify-center items-center min-h-[60px]">
                    <Loader />
                </div>
            )}
            {isError && (
                <p className="text-red-500 mb-4">
                    {(error as Error)?.message ||
                        "Something went wrong. Please try again."}
                </p>
            )}
        </div>
    );
};

export default Search;
