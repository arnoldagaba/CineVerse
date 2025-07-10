import axios from "axios";

const tmdbClient = axios.create({
    baseURL: import.meta.env.VITE_TMDB_BASE_URL,
    timeout: 10000,
    params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        language: "en-US",
        include_adult: true,
    },
});

tmdbClient.interceptors.request.use(
    (config) => {
        console.log(
            `[TMDB] Request: ${config.method?.toUpperCase()} ${config.url}`
        );
        return config;
    },
    (error) => Promise.reject(error)
);

export default tmdbClient;
