import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import AppRoutes from "@/routes/AppRoutes";

function App() {
  return <ThemeProvider>
    <FavoritesProvider>
      <AppRoutes/>
    </FavoritesProvider>
  </ThemeProvider>
}

export default App;