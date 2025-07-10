import {
    createContext,
    useEffect,
    useReducer,
    type Dispatch,
    type ReactNode,
} from "react";

type Movie = {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
};

type FavoritesState = {
    movies: Movie[];
};

type FavoritesAction =
    | { type: "ADD"; payload: Movie }
    | { type: "REMOVE"; payload: number }
    | { type: "LOAD"; payload: Movie[] };

interface FavoritesContextType {
    state: FavoritesState;
    dispatch: Dispatch<FavoritesAction>;
}

const FavoritesContext = createContext<FavoritesContextType>({
    state: { movies: [] },
    dispatch: () => null,
});

function favoritesReducer(
    state: FavoritesState,
    action: FavoritesAction
): FavoritesState {
    switch (action.type) {
        case "ADD":
            return {
                ...state,
                movies: [
                    ...state.movies.filter(
                        (movie) => movie.id !== action.payload.id
                    ),
                    action.payload,
                ],
            };
        case "REMOVE":
            return {
                ...state,
                movies: state.movies.filter((m) => m.id !== action.payload),
            };
        case "LOAD":
            return {
                ...state,
                movies: action.payload,
            };
        default:
            return state;
    }
}

function FavoritesProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(favoritesReducer, { movies: [] });

    // load from localStorage
    useEffect(() => {
        const stored = localStorage.getItem("favorites");
        if (stored) {
            dispatch({ type: "LOAD", payload: JSON.parse(stored) });
        }
    }, []);

    // save to localStorage
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(state.movies));
    }, [state.movies]);

    return (
        <FavoritesContext.Provider value={{ state, dispatch }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export { FavoritesContext, FavoritesProvider };
