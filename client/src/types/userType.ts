import { Courses } from "./courseType";

export interface User {
    userId: string;
    eMail: string;
    password?: string;
    safePercentage: number;
    courses: Courses;
};