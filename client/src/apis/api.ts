import url from "../utils/apiUrl";

interface ApiConfig extends RequestInit {
    headers: {
        'Content-Type': string;
        Authorization?: string;
    };
}

const apiRequest = async (endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data: any | null = null, token: string = '') => {
    const config: ApiConfig = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (data) {
        config.body = JSON.stringify(data);
    }

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url + endpoint, config);
    const responseData = await response.json();

    if (!response.ok) {
        const error = new Error(responseData.error || 'API request failed') as any;
        error.status = response.status;
        error.response = responseData;
        throw error;
    }

    return responseData;
};

export default apiRequest;