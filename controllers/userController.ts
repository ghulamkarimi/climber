import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import Users from '../models/userModel';


export const registerUser = asyncHandler(
    async (req: Request, res: Response) => {
        const { firstName, lastName, email, password, confirmPassword, gender } = req.body;
        const existingUser = await Users.findOne({ email });
        if (existingUser)
            throw new Error('User already exists');
        if (password !== confirmPassword)
            throw new Error('Passwords do not match');
        try {
            const user = await Users.create({
                firstName,
                lastName,
                email,
                password,
                gender
            })
            res.json({
                user: user,
                message: 'User registered successfully'
            })
        } catch (error) {
            console.log(error)
            res.json(error)
        }

    })