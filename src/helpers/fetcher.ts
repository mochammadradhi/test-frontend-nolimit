import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

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
            return { status: "error", message: String(err.response.data) }; 
        }
        return { status: "error", message: "Unknown error occurred, Please Try Again!" };
    }
};

export { GlobalGet };