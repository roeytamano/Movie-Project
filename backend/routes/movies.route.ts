import express from 'express';
import { addToFavoritesOrPlanned, getMovieByIdOrTitle, getMovieBySearching, removeFromFavoritesOrPlanned } from '../controllers/movies.controller';

const router = express.Router();

router.get('/', getMovieBySearching);
router.get('/:movieIdOrTitle', getMovieByIdOrTitle);
router.delete('/:userId', removeFromFavoritesOrPlanned);
router.patch('/:userId', addToFavoritesOrPlanned); 

export default router;