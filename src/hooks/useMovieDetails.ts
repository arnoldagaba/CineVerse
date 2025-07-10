import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetails } from "@/api/movie.service";

export function useMovieDetails(movieId: number) {
    return useQuery({
        queryKey: ["movieDetails", movieId],
        queryFn: () => fetchMovieDetails(movieId),
        staleTime: 1000 * 60 * 10, // details change rarely
    });
}
