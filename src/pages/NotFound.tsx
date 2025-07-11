import { Link } from "react-router";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center p-4">
            <h1 className="text-5xl font-bold mb-4">404</h1>
            <p className="text-xl mb-6 text-gray-600 dark:text-gray-400">
                Oops! Page not found.
            </p>

            <Link
                to="/"
                className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;
