import { Schema, model, Document } from "mongoose";

export interface Course extends Document{
    _id?: Schema.Types.ObjectId,
    courseCode: string;
    courseName: string;
    missedHours: number;
    attendedHours: number;
    unknownHours: number;
};

export const courseSchema = new Schema<Course>(
    {
        courseCode:  {
            type: String,
            required: true,
        },
        courseName: {
            type: String,
            required: true,
        },
        missedHours: {
            type: Number,
            required: true
        },
        attendedHours: {
            type: Number,
            required: true
        },
        unknownHours: {
            type: Number,
            required: true
        }
    }
);

const courseModel = model("Course", courseSchema);

export default courseModel;