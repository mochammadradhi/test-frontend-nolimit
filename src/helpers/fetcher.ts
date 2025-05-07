import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
// Membuat function helpers component khususnya menggunakan axios untuk fetch API dan agar bisa digunakan berulang ulang
interface FetcherArgs extends AxiosRequestConfig {
    url: string;
    data?: unknown;
    headers?: Record<string, string>;
}

interface ApiResponse<T = unknown> {
    source: any; 
    data?: T;
    status?: string;
    message?: string;
}

const GlobalGet = async <T = unknown>(args: FetcherArgs): Promise<ApiResponse<T>> => {
    try {
        const response: AxiosResponse<ApiResponse<T>> = await axios({ ...args, method: "GET", timeout: 5000 }); // Updated timeout to 5000ms
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response) {
            return { 
                status: "error", 
                message: String(err.response.data), 
                source: null 
            }; 
        }
        return { 
            status: "error", 
            message: "Unknown error occurred, Please Try Again!", 
            source: null 
        };
    }
};

export { GlobalGet };