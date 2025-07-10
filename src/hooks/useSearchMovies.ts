import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "@/api/movie.service";

export function useSearchMovies(query: string, page: number) {
    return useQuery({
        queryKey: ["searchMovies", query, page],
        queryFn: () => searchMovies(query, page),
        enabled: !!query, // only run when query is truthy
        placeholderData: (prevData) => prevData,
    });
}
