import { useQuery } from "@tanstack/react-query";
import { fetchUpcomingMovies } from "@/api/movie.service";

export function useUpcomingMovies(page: number) {
    return useQuery({
        queryKey: ["upcomingMovies", page],
        queryFn: () => fetchUpcomingMovies(page),
        staleTime: 1000 * 60 * 5,
        placeholderData: (prevData) => prevData,
    });
}
