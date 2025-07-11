import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchMovies } from "@/hooks/useSearchMovies";
import type { Movie } from "@/api/movie.service";

export function useMovieSuggestions(query: string) {
    const debounced = useDebounce(query, 300);
    const { data, isLoading } = useSearchMovies(debounced, 1);
    const [suggestions, setSuggestions] = useState<Movie[]>([]);

    useEffect(() => {
        if (debounced && data?.results) {
            setSuggestions(data.results.slice(0, 6));
        } else {
            setSuggestions([]);
        }
    }, [debounced, data]);

    return { suggestions, isLoading };
}
