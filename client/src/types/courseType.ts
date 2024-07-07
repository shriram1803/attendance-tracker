export interface Course {
    courseId: string;
    courseCode: string;
    courseName: string;
    attendedHours: number;
    totalHours: number;
};

export type Courses = Array<Course>;