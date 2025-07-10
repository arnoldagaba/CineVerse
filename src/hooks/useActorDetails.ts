import { useQuery } from "@tanstack/react-query";
import { fetchActorDetails } from "@/api/movie.service";

export function useActorDetails(actorId: number) {
    return useQuery({
        queryKey: ["actorDetails", actorId],
        queryFn: () => fetchActorDetails(actorId),
        staleTime: 1000 * 60 * 10,
    });
}
