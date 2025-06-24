import axios from 'axios';
import BASE_URL, { ENDPOINTS } from './endpoints';
import { toast } from 'react-toastify';
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

axiosInstance.interceptors.request.use((config) => {
    const publicPaths = [ENDPOINTS.AUTH.LOGIN, ENDPOINTS.AUTH.SINGUP];
    if (!publicPaths.includes(config.url)) {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    return config;
})

axiosInstance.interceptors.response.use(
    (response) => {
        if (['post', 'put', 'delete'].includes(response.config.method)) {
            toast.success('✔️ Success!');
        }
        return response;
    },
    (error) => {
        const message =
            error.response?.data?.message ||
            error.response?.statusText ||
            'Something went wrong!';
        toast.error(`❌ ${message}`);
        return Promise.reject(error);
    }
)


export default axiosInstance;