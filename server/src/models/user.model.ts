import { Schema, model, Document } from "mongoose";
import { Course, courseSchema } from "./course.model.js";

export interface User extends Document{
    _id?: Schema.Types.ObjectId,
    eMail: string;
    password: string;
    safePercentage: number;
    courses?: Schema.Types.ObjectId[];
};

const userSchema = new Schema<User>(
    {
        eMail:  {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            private: true
        },
        safePercentage: {
            type: Number,
            required: true
        },
        courses: [{
            type: Schema.Types.ObjectId,
            ref: "Course"
        }]
    }
);

const userModel = model("User", userSchema);

export default userModel;