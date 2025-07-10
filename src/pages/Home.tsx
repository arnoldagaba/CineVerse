import { useState } from "react";
import { usePopularMovies } from "@/hooks/usePopularMovies";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import MovieCard from "@/components/Movie/MovieCard";
import Loader  from "@/components/Shared/Loader";
import type { Movie } from "@/api/movie.service";

const Home = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, isFetching } = usePopularMovies(page);

    useInfiniteScroll(
        () => setPage((p) => p + 1),
        page < (data?.total_pages ?? 1),
        isFetching
    );

    return (
        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {data?.results?.map((movie: Movie) => (
                <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    posterPath={movie.poster_path}
                    releaseDate={movie.release_date}
                    rating={movie.vote_average}
                />
            ))}
            {isLoading && <Loader />}
        </div>
    );
};

export default Home;
