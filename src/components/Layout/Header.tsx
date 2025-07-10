import { Link } from "react-router";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const Header = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="bg-white dark:bg-gray-900 shadow p-4 flex justify-between items-center">
            <Link
                to="/"
                className="text-2xl font-bold text-blue-600 dark:text-blue-400"
            >
                CineVerse
            </Link>

            <nav className="flex gap-6">
                <Link
                    to="/"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                    Home
                </Link>
                <Link
                    to="/favorites"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                    Favorites
                </Link>
                <Link
                    to="/search"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                    Search
                </Link>
            </nav>

            <button onClick={toggleTheme}>
                {theme === "dark" ? (
                    <Sun className="w-6 h-6" />
                ) : (
                    <Moon className="w-6 h-6" />
                )}
            </button>
        </header>
    );
};

export default Header;
