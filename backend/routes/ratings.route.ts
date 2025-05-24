import express from 'express';
import { createRating, getRatingsByUserId } from '../controllers/ratings.controller';

const router = express.Router();

router.get('/:userId', getRatingsByUserId);
router.post('/', createRating);

export default router;