import express from 'express';
import { addToFavoritesOrPlanned, getMovieByIdOrTitle, getMovieBySearching, removeFromFavoritesOrPlanned } from '../controllers/ratings.controller';

const router = express.Router();

router.get('/', getMovieBySearching);
router.get('/:movieIdOrTitle', getMovieByIdOrTitle);
router.delete('/api/movies/:userId', removeFromFavoritesOrPlanned);
router.patch('/api/movies/:userId', addToFavoritesOrPlanned);

export default router;