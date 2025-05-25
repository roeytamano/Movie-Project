import {Request, Response } from 'express';
import User from '../models/user.model.js';
import mongoose from 'mongoose';

export const getUser = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ success: false, message: 'Invalid user ID format.' });
        return;
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find()
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { userName, password } = req.body;
    if (!userName || !password) {
        res.status(400).json({success: false, message: 'All fields are required' });
        return;
    }
    try {
        const newUser = new User({
            userName,
            password,
        });
        await newUser.save();
        res.status(201).json({success: true, data: newUser});
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({success: false, message: 'Internal server error' });
    }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { userName, password } = req.body;
    if (!userName || !password) {
        res.status(400).json({ success: false, message: 'All fields are required' });
        return;
    }
    try {
        const user = await User.findOne({ userName });
        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }
        if (user.password !== password) {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
            return;
        }
        res.status(200).json({ success: true, message: 'Login successful', data: { userName: user.userName, _id: user._id } });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};