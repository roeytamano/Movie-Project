import {Request, Response } from 'express';
import User from '../models/user.model';

export const getUser = async (req: Request, res: Response): Promise<void> => {
    const { user } = req.params;

    try {
        const foundUser = await User.findOne({ userName: user });
        if (!foundUser) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }
        res.status(200).json({ success: true, data: foundUser });
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