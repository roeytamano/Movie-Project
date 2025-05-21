import mongoose, { Document, Schema, Model } from "mongoose";


export interface IUser extends Document {
    userName: string;
    password: string;
    favoriteMovies: string[];
    plannedMovies: string[];
    createdAt?: Date; 
    updatedAt?: Date; 
}


const userSchema: Schema<IUser> = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true, 
        },
        password: {
            type: String,
            required: true,
        },
        favoriteMovies: {
            type: [String], 
            default: [],
        },
        plannedMovies: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;