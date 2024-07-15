import { Router } from "express";
import verifyToken from "../middleware/authMiddleware.js";
import { addCourse, updateCourse, removeCourse, getCourse, getAllCourses } from "../controllers/course.controller.js";

const courseRoutes = Router();

courseRoutes.post('/add', verifyToken, addCourse);
courseRoutes.put('/update/:courseId', verifyToken, updateCourse);
courseRoutes.delete('/remove/:courseId', verifyToken, removeCourse);
courseRoutes.get('/get/:courseId', verifyToken, getCourse);
courseRoutes.get('/getAll/:id', verifyToken, getAllCourses);

export default courseRoutes;