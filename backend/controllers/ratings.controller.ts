import express from 'express';
import mongoose from 'mongoose';
import Rating from '../models/rating.model.js';

export const getRatingsByUserId = async (req: express.Request, res: express.Response): Promise<void> => {
    const { userId } = req.params;

    try {
        const ratings = await Rating.find({ userId: new mongoose.Types.ObjectId(userId) });
        res.status(200).json({ success: true, data: ratings });
    } catch (error) {
        console.error('Error fetching ratings:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const createRating = async (req: express.Request, res: express.Response): Promise<void> => {
    const { userId, userName, movieId, rating, comment } = req.body;

    if (!userName || !userId || !movieId || rating === undefined || !comment) {
        res.status(400).json({ success: false, message: 'All fields are required' });
        return;
    }

    try {
        const newRating = new Rating({
            userId, 
            userName, // Ensure userName is saved
            movieId,
            rating,
            comment,
        });

        await newRating.save();
        res.status(201).json({ success: true, data: newRating });
    } catch (error) {
        console.error('Error saving rating:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
