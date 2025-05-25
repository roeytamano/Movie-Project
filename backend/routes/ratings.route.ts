import express from 'express';
import { createRating, getRatingsByUserId } from '../controllers/ratings.controller.js';

const router = express.Router();

router.get('/:userId', getRatingsByUserId);
router.post('/', createRating);

export default router;