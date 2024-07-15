import { Router } from "express";
import { login, addUser, updateUser, validateUser } from "../controllers/user.controller.js";
import verifyToken from "../middleware/authMiddleware.js";

const userRoutes = Router();

userRoutes.post('/login', login);
userRoutes.post('/add', addUser);
userRoutes.put('/update', verifyToken, updateUser);
userRoutes.post('/validate', verifyToken, validateUser);


export default userRoutes;