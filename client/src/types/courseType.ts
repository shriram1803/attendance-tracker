export interface Course {
    _id: string;
    courseCode: string;
    courseName: string;
    attendedHours: number;
    missedHours: number;
    unknownHours: number;
};

export type AttendaceFieldType = 'attendedHours' | 'missedHours' | 'unknownHours' | null;

export type Courses = Array<Course>;