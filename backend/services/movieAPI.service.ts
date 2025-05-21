import axios from 'axios';

const API_KEY = process.env.OMDB_API_KEY;
const OMDB_URL = "http://www.omdbapi.com/";

export const getMovieDetails = async (movieId: string, title?: string) => {
    try {
        const params: Record<string, string> = {
            apikey: API_KEY || '',
        };

        if (movieId) {
            params.i = movieId;
        }

        if (title) {
            params.t = title;
        }

        const response = await axios.get(OMDB_URL, { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        throw new Error("Failed to fetch movie details");
    }
};

export const getMovieBySearch = async (title: string, page: number) => {
    try {
        const params = {
            apikey: API_KEY || '',
            s: title,
            page: page
        };

        const response = await axios.get(OMDB_URL, { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching movie by search:", error);
        throw new Error("Failed to fetch movie by search");
    }
}

// 93394625ae860831d6eff3207c5da043
