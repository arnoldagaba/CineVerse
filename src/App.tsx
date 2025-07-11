import { HelmetProvider } from "react-helmet-async";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import AppRoutes from "@/routes/AppRoutes";

function App() {
    return (
        <HelmetProvider>
            <ThemeProvider>
                <FavoritesProvider>
                    <AppRoutes />
                </FavoritesProvider>
            </ThemeProvider>
        </HelmetProvider>
    );
}

export default App;
