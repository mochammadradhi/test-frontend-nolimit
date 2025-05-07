import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface FetcherArgs extends AxiosRequestConfig {
    url: string;
    data?: unknown;
    headers?: Record<string, string>;
}

interface ApiResponse<T = unknown> {
    data?: T;
    status?: string;
    message?: string;
}

const GlobalGet = async <T = unknown>(args: FetcherArgs): Promise<ApiResponse<T>> => {
    try {
        const response: AxiosResponse<ApiResponse<T>> = await axios({ ...args, method: 'GET', timeout: 5 });
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response) {
            return err.response.data;
        }
        return { message: 'Unknown error occurred' };
    }
}


export { GlobalGet };