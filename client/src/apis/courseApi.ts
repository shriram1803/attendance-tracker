import apiRequest from "./api";

export const addCourse = async (courseCode: string, courseName: string, token?: string) => {
    const endpoint = '/api/course/add';
    const method = 'POST';
    const data = { courseCode, courseName };

    return await apiRequest(endpoint, method, data, token);
};

export const updateCourse = async (courseId: string, courseCode?: string, courseName?: string, attendedHours?: number, missedHours?: number, unknownHours?: number, token?: string) => {
    const endpoint = `/api/course/update/${courseId}`;
    const method = 'PUT';
    const data = { courseCode, courseName, attendedHours, missedHours, unknownHours };

    return await apiRequest(endpoint, method, data, token);
};

export const removeCourse = async (courseId: string, token: string) => {
    const endpoint = `/api/course/remove/${courseId}`;
    const method = 'DELETE';
    const data = { };

    return await apiRequest(endpoint, method, data, token);
};

export const getCourse = async (courseId: string, token: string) => {
    const endpoint = `/api/course/get/${courseId}`;
    const method = 'GET';

    return await apiRequest(endpoint, method, null, token);
};

export const getAllCourse = async (userId: string, token: string) => {
    const endpoint = `/api/course/getAll/${userId}`;
    const method = 'GET';

    return await apiRequest(endpoint, method, null, token);
};
