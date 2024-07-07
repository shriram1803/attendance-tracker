import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel, { User } from "../models/user.model.js";
import { jwtSecret } from "../config/index.js";


const generateJwt = (id: unknown): string => {
    return jwt.sign({ userId: id }, jwtSecret, {
        expiresIn: '10d',
    });
};

export const addUser = async (req: Request, res: Response) => {
    try {
        const { eMail, password, safePercentage } = req.body;
        const hashedPassword: string = await bcrypt.hash(password, 10);
        const user: User = new userModel({
            eMail: eMail,
            password: hashedPassword,
            safePercentage: safePercentage,
            courses: []
        });

        await user.save();
        
        const token: string = generateJwt(user._id);

        res.status(200).json({ token: token, userData: user });
    } catch (err) {
        res.status(500).json({ error: "Registration Failed" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { eMail, password } = req.body;
        const user: User = await userModel.findOne({ eMail: eMail }).populate('courses');

        if (!user) {
            return res.status(401).json({ error: "User Not Available" });
        }

        const passwordMatch: boolean = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Wrong Password' });
        }

        const token: string = generateJwt(user._id);

        res.status(200).json({ token: token, userData: user });
    } catch (err) {
        res.state(500).json({ error: "Login Failed" });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { eMail, password, safePercentage } = req.body;
        const user: User = await userModel.findById(id).populate('courses');

        if (!user) {
            return res.status(401).json({ error: "User Not Available" });
        }

        const hashedPassword: string | null = password ? await bcrypt.hash(password, 10) : null;

        const updatedUser: User = {
            eMail: eMail || user.eMail,
            password: hashedPassword || user.password,
            safePercentage: safePercentage || user.safePercentage
        } as User;

        await userModel.findOneAndUpdate({eMail: eMail}, updatedUser);
        
        res.status(200).json({ message: "Updated user" });
    } catch (err) {
        res.status(500).json({ error: "Updation failed" });
    }
};

export const validateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        
        const user: User = await userModel.findById(userId).populate('courses');

        if (!user) {
            return res.status(401).json({ error: "User Not Available" });
        }
        
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: "Errer fetching user data" });
    }
};