import { Link } from "react-router";

type Props = {
    id: number;
    title: string;
    posterPath: string | null;
    releaseDate: string;
    rating: number;
};

const MovieCard = ({ id, title, posterPath, releaseDate, rating }: Props) => {
    return (
        <Link
            to={`/movie/${id}`}
            className="transform hover:scale-105 transition"
        >
            <div className="bg-gray-100 dark:bg-gray-800 rounded overflow-hidden shadow hover:shadow-lg">
                {posterPath ? (
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
                        alt={title}
                        className="w-full h-80 object-cover"
                    />
                ) : (
                    <div className="w-full h-80 bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                        No Image
                    </div>
                )}

                <div className="p-4">
                    <h3 className="text-lg font-semibold truncate">{title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        {releaseDate}
                    </p>
                    <p className="text-yellow-500 font-bold">
                        {rating.toFixed(1)} ★
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
