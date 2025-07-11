import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { usePopularMovies } from "@/hooks/usePopularMovies";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import MovieCard from "@/components/Movie/MovieCard";
import Loader from "@/components/Shared/Loader";
import type { Movie } from "@/api/movie.service";
import { PageHeader } from "@/components/Shared/PageHeader";
import { MovieGrid } from "@/components/Movie/MovieGrid";


const Home = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, isFetching } = usePopularMovies(page);

    useInfiniteScroll(
        () => setPage((p) => p + 1),
        page < (data?.total_pages ?? 1),
        isFetching
    );

    return (
        <main className="p-6 min-h-screen">
            <Helmet>
                <title>CineVerse | Discover Movies</title>
                <meta
                    name="description"
                    content="Browse popular and top rated movies on CineVerse."
                />
            </Helmet>

            <PageHeader title="Popular Movies" />

            {data?.results?.length ? (
                <MovieGrid>
                    {data.results.map((movie: Movie) => (
                        <MovieCard
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            posterPath={movie.poster_path}
                            releaseDate={movie.release_date}
                            rating={movie.vote_average}
                        />
                    ))}
                </MovieGrid>
            ) : (
                !isLoading && (
                    <p className="col-span-full text-center text-gray-500">
                        No movies found.
                    </p>
                )
            )}
            {isLoading && <Loader />}
        </main>
    );
};

export default Home;
