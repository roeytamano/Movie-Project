import express from 'express';
import { createRating, getRatingsByUserId } from '../controllers/movies.controller';

const router = express.Router();

router.get('/api/ratings/:userId', getRatingsByUserId);
router.post('/api/ratings', createRating);

export default router;