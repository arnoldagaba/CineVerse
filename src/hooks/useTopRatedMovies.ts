import { useQuery } from "@tanstack/react-query";
import { fetchTopRatedMovies } from "@/api/movie.service";

export function useTopRatedMovies(page: number) {
    return useQuery({
        queryKey: ["topRatedMovies", page],
        queryFn: () => fetchTopRatedMovies(page),
        staleTime: 1000 * 60 * 5,
        placeholderData: (prevData) => prevData,
    });
}
