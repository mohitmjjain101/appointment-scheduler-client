const BASE_URL = 'http://localhost:3001/api';

export const ENDPOINTS = {
    AUTH: {
        LOGIN: `${BASE_URL}/auth/login`,
        SINGUP: `${BASE_URL}/auth/singup`,
    },
    APPOINTMENT: {
        GET_ALL_AND_CREATE: `${BASE_URL}/appointments`,
        DELETE_AND_UPDATE: (id) => `${BASE_URL}/appointments/${id}`,
    }
} 

export default BASE_URL;