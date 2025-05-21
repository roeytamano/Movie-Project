import mongoose, { Document, Schema, Model } from "mongoose";

export interface IRating extends Document {
    userId: mongoose.Types.ObjectId;
    movieId: string; // IMDb ID of the movie
    rating: number; 
    comment: string; 
    createdAt?: Date; 
    updatedAt?: Date; 
}

const ratingSchema: Schema<IRating> = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        movieId: {
            type: String, // Store IMDb IDs as strings
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1, 
            max: 10, 
        },
        comment: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 500, 
        },
    },
    { timestamps: true } 
);

const Rating: Model<IRating> = mongoose.model<IRating>("Rating", ratingSchema);

export default Rating;