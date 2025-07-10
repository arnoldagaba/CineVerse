import { useQuery } from "@tanstack/react-query";
import { fetchPopularMovies } from "@/api/movie.service";

export function usePopularMovies(page: number) {
    return useQuery({
        queryKey: ["popularMovies", page],
        queryFn: () => fetchPopularMovies(page),
        staleTime: 1000 * 60 * 5, // 5 minutes
        placeholderData: (prevData) => prevData,
    });
}
