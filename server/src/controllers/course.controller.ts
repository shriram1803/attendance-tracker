import { Request, Response } from "express";
import userModel, { User } from "../models/user.model.js";
import courseModel, { Course } from "../models/course.model.js";


export const addCourse = async (req: Request, res: Response) => {
    try {
        const { userId, courseCode, courseName } = req.body;

        const course: Course = new courseModel({
            courseCode,
            courseName,
            missedHours: 0,
            attendedHours: 0,
            unknownHours: 0
        });

        const savedCourse: Course = await course.save();

        const user: User = await userModel.findById(userId);

        user.courses.push(savedCourse._id);

        await user.save();

        res.status(200).json(course);
    } catch(err) {
        res.status(500).json({error: "Could not add course detail"});
    }
};

export const updateCourse = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;
        const { courseCode, courseName, attendedHours, missedHours, unknownHours } = req.body;

        const course: Course = await courseModel.findById(courseId);

        if(!course) {
            return res.status(401).json({message: 'Course not avaiable'});
        }
        
        const updatedCourseDetails: Course = {
            courseCode: courseCode || course.courseCode,
            courseName: courseName || course.courseName,
            attendedHours: attendedHours || course.attendedHours,
            missedHours: missedHours || course.missedHours,
            unknownHours: unknownHours || course.unknownHours
        } as Course;

        await courseModel.findOneAndUpdate({_id: courseId}, updatedCourseDetails);

        res.status(200).json({message: "Updated course"});
    } catch(err) {
        res.status(500).json({error: "Could not update course detail"});
    }
};

export const removeCourse = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;
        const { userId } = req.body;
        
        const deleted: boolean = await courseModel.findByIdAndDelete(courseId);

        if(!deleted) {
            return res.status(401).json({error: "id not found"});
        }

        const user: User = await userModel.findById(userId);
        
        user.courses = user.courses.filter(course => course.toString() !== courseId);

        await user.save();

        res.status(200).json({message: "Deleted course"});
    } catch(err) {
        res.status(500).json({error: "Could not delete course detail"});
    }
};

export const getCourse = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;
        
        const course: Course = await courseModel.findById(courseId);

        res.status(200).json(course);
    } catch(err) {
        res.status(500).json({error: "Could not get course detail"});
    }
};

export const getAllCourses = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user: User = await userModel.findOne({_id: id}).populate('courses');

        res.status(200).json(user.courses);
    } catch(err) {
        res.status(500).json({error: "Could not get course details"});
    }
};