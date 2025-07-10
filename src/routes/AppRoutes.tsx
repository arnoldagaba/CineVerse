import { BrowserRouter, Route, Routes } from "react-router";
import Header from "@/components/Layout/Header";
import Home from "@/pages/Home";
import Footer from "@/components/Layout/Footer";
import MovieDetails from "@/pages/MovieDetails";
import Search from "@/pages/Search";
import Favorites from "@/pages/Favorites";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <Header />

                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                    {/* <Route path="/actor/:id" element={<ActorDetails />} /> */}
                    {/* <Route path="*" element={<NotFound />} /> */}
                  </Routes>
                </main>

                <Footer />
            </div>
        </BrowserRouter>
    );
};

export default AppRoutes;
