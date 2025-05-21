import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import { connectDB } from './config/db';
import Rating from './models/rating.model';
import User from './models/user.model';
import { getMovieBySearch, getMovieDetails } from './services/movieAPI.service';
import userRoutes from './routes/users.route';
import movieRoutes from './routes/movies.route';
import ratingRoutes from './routes/ratings.route';

const app: Application = express();
const PORT: number | string = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/users', userRoutes)
app.use('/api/movies', movieRoutes)
app.use('/api/ratings', ratingRoutes)

app.patch('/api/movies/:userId', async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    const { movieId, listType } = req.body; // `listType` can be "favorite" or "planned"

    if (!movieId || !listType || !['favorite', 'planned'].includes(listType)) {
        res.status(400).json({ success: false, message: 'Invalid request. Provide a valid movieId and listType ("favorite" or "planned").' });
        return;
    }

    try {
        const updateField = listType === 'favorite' ? 'favoriteMovies' : 'plannedMovies';

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { [updateField]: movieId } }, 
            { new: true }
        );

        if (!updatedUser) {
            res.status(404).json({ success: false, message: 'User not found.' });
            return;
        }

        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        console.error('Error updating user movies:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

app.delete('/api/movies/:userId', async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    const { movieId, listType } = req.body; // `listType` can be "favorite" or "planned"

    if (!movieId || !listType || !['favorite', 'planned'].includes(listType)) {
        res.status(400).json({ success: false, message: 'Invalid request. Provide a valid movieId and listType ("favorite" or "planned").' });
        return;
    }

    try {
        const updateField = listType === 'favorite' ? 'favoriteMovies' : 'plannedMovies';

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { [updateField]: movieId } }, 
            { new: true }
        );

        if (!updatedUser) {
            res.status(404).json({ success: false, message: 'User not found.' });
            return;
        }

        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        console.error('Error updating user movies:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

app.get('/api/movies/:movieIdOrTitle', async (req: Request, res: Response): Promise<void> => {
    const { movieIdOrTitle } = req.params;
    const { details } = req.query;

    try {
        // Check if the parameter is an IMDb ID (starts with "tt" and followed by digits)
        const isImdbId = /^tt\d+$/.test(movieIdOrTitle);
        const movieDetails = isImdbId
            ? await getMovieDetails(movieIdOrTitle)
            : await getMovieDetails('', movieIdOrTitle);

        if (!movieDetails || movieDetails.Response === 'False') {
            res.status(404).json({ success: false, message: 'Movie not found.' });
            return;
        }
        if (details === 'basic') {
            res.status(200).json({
                success: true,
                data: {
                    title: movieDetails.Title,
                    poster: movieDetails.Poster,
                    genre: movieDetails.Genre,
                    rating: movieDetails.imdbRating,
                },
            });
        } else {
            const ratings = await Rating.find({ movieId: movieDetails.imdbID });
            if (!ratings) {
                res.status(404).json({ success: false, message: 'Ratings not found.' });
                return;
            }
            res.status(200).json({
                success: true,
                data: {
                    title: movieDetails.Title,
                    released: movieDetails.Released,
                    genre: movieDetails.Genre,
                    plot: movieDetails.Plot,
                    poster: movieDetails.Poster,
                    rating: movieDetails.imdbRating,
                    comments: ratings.map((r) => ({
                        userId: r.userId,
                        rating: r.rating,
                        comment: r.comment,
                    })),
                },
            });
        }
    } catch (error) {
        console.error('Error fetching movie details:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.get('/api/movies/', async (req: Request, res: Response): Promise<void> => {
    const { search } = req.query; 
    const { page = '1' } = req.query; 

    if (!search || typeof search !== 'string') {
        res.status(400).json({ success: false, message: 'Search term is required and must be a string.' });
        return;
    }
    if (typeof page !== 'string' || isNaN(Number(page))) {
        res.status(400).json({ success: false, message: 'Invalid page number.' });
        return;
    }
    try {
        const movies = await getMovieBySearch(search, Number(page));
        if (!movies || movies.Response === 'False') {
            res.status(404).json({ success: false, message: 'Movies not found.' });
            return;
        }
        res.status(200).json({ success: true, data: movies.Search });
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.listen(PORT, (): void => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});