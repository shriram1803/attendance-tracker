export interface Course {
    _id: string;
    courseCode: string;
    courseName: string;
    attendedHours: number;
    totalHours: number;
    unknownHours: number;
};

export type AttendaceFieldType = 'attendedHours' | 'totalHours' | 'unknownHours' | null;

export type Courses = Array<Course>;