export interface Course {
    _id?: string;
    courseId: string;
    courseCode: string;
    courseName: string;
    attendedHours: number;
    totalHours: number;
    unknownHours: number;
};

export type CourseFieldType = 'attendedHours' | 'totalHours' | 'unknownHours' | null;

export type Courses = Array<Course>;