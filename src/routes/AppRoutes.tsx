import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import Header from "@/components/Layout/Header";
import Home from "@/pages/Home";
import Footer from "@/components/Layout/Footer";
import MovieDetails from "@/pages/MovieDetails";
import Search from "@/pages/Search";
import Favorites from "@/pages/Favorites";
import NotFound from "@/pages/NotFound";
import ActorDetails from "@/pages/ActorDetails";

const AnimatedRoutes = () => {
    const location = useLocation();
    
    return (
        <>
            <Header />
            <AnimatePresence mode="wait">
                <motion.main
                    key={location.pathname}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex-grow"
                >
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<Home />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="/movie/:id" element={<MovieDetails />} />
                        <Route path="/actor/:id" element={<ActorDetails />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </motion.main>
            </AnimatePresence>
            <Footer />
        </>
    );
};

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <AnimatedRoutes />
            </div>
        </BrowserRouter>
    );
};

export default AppRoutes;
