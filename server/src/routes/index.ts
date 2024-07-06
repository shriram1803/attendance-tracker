import { Router } from "express";
import userRoutes from "./user.route.js";
import courseRoutes from "./course.route.js";

const router = Router();

router.use('/user', userRoutes);
router.use('/course', courseRoutes);

export default router;