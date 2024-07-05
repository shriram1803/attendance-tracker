import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { jwtSecret } from "../config/index.js";

const verifyToken = (req: Request, res: Response, next: any) => {
    const authHeader: string = req.header('Authorization') || '';
    const token: string = authHeader && authHeader.split(' ')[1] || ''; 
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.body.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

export default verifyToken;