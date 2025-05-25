import express, { Application } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {connectDB} from './config/db.js';
import userRoutes from './routes/users.route.js';
import movieRoutes from './routes/movies.route.js';
import ratingRoutes from './routes/ratings.route.js';

const app: Application = express();
const PORT: number | string = process.env.PORT || 5000;


app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true 
}));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/ratings', ratingRoutes);

app.listen(PORT, (): void => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});