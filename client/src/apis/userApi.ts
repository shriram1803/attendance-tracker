import apiRequest from "./api";

export const loginUser = async (eMail: string, password: string) => {
    const endpoint = '/api/user/login';
    const method = 'POST';
    const data = { eMail, password };

    return await apiRequest(endpoint, method, data);
};

export const registerUser = async (eMail: string, password: string, safePercentage: number) => {
    const endpoint = '/api/user/add';
    const method = 'POST';
    const data = { eMail, password, safePercentage };

    return await apiRequest(endpoint, method, data);
};

export const updateUser = async (eMail: string, password: string, safePercentage: number, token: string) => {
    const endpoint = `/api/user/update`;
    const method = 'PUT';
    const data = { eMail, password, safePercentage };

    return await apiRequest(endpoint, method, data, token);
};

export const validateUser = async (token: string) => {
    const endpoint = `/api/user/validate`;
    const method = 'POST';

    return await apiRequest(endpoint, method, null, token);
};
