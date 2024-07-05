import { Schema, model, Document } from "mongoose";

export interface Course extends Document{
    courseCode: string;
    courseName: string;
    totalHours: number;
    attendedHourse: number;
};

const courseSchema = new Schema<Course>(
    {
        courseCode:  {
            type: String,
            required: true,
            unique: true
        },
        courseName: {
            type: String,
            required: true,
        },
        totalHours: {
            type: Number,
            required: true
        },
        attendedHourse: {
            type: Number,
            required: true
        }
    }
);

const courseModel = model("Course", courseSchema);

export default courseModel;