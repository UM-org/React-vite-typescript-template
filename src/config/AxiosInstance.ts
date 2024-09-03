import axios, { AxiosError, AxiosResponse } from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.BASE_SERVER_API_URL,
    timeout: 15000,
    withCredentials: true,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
});

export const setAuthToken = async (config: any) => {
    try {
        const token = localStorage.getItem(import.meta.env.AUTH_TOKEN || "@token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        } else {
            delete config.headers.Authorization;
        }
    } catch (error) {
        // saving error
    }
}

const responseHandler = (response: AxiosResponse) => {
    return response;
};

const errorHandler = async (error: AxiosError) => {
    try {
        const token = localStorage.getItem(import.meta.env.AUTH_TOKEN || "@token");
        if (error.code === AxiosError.ERR_NETWORK || error.code === AxiosError.ETIMEDOUT) {
            console.log("network error");
        }
        if (token && error.response?.status === 401) {
            console.log("unauthorized");
        }
        if (error.response?.status === 500) {
            console.log("server error");
        }
        return Promise.reject(error);
    } catch (error) {
        return Promise.reject(error);
    }
};

axiosInstance.interceptors.request.use(async function (config) {
    //uncomment if auth is needed
    // await setAuthToken(config);
    return config;
}, function (error) {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
    async (response) => await responseHandler(response),
    async (error) => await errorHandler(error)
);
export default axiosInstance;