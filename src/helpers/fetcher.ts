import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface FetcherArgs extends AxiosRequestConfig {
    url: string;
    data?: any;
    headers?: Record<string, string>;
}

interface ApiResponse<T = any> {
    data?: T;
    status?: string;
    message?: string;
}

const GlobalGet = async <T = any>(args: FetcherArgs): Promise<ApiResponse<T>> => {
    try {
        const response: AxiosResponse<T> = await axios({ ...args, method: 'GET' }, { timeout: 5 });
        return response?.data;
    } catch (err: any) {
        return err?.response?.data;
    }
};

const GlobalPost = async <T = any>(args: FetcherArgs): Promise<ApiResponse<T>> => {
    try {
        const response: AxiosResponse<T> = await axios({ ...args, method: 'POST' }, { timeout: 5 });
        return response?.data;
    } catch (err: any) {
        return err?.response?.data;
    }
};

const GlobalDelete = async <T = any>(args: FetcherArgs): Promise<ApiResponse<T>> => {
    try {
        const response: AxiosResponse<T> = await axios({ ...args, method: 'DELETE' });
        return response?.data;
    } catch (err: any) {
        return err?.response?.data;
    }
};

const GlobalPut = async <T = any>(args: FetcherArgs): Promise<ApiResponse<T>> => {
    try {
        const response: AxiosResponse<T> = await axios({ ...args, method: 'PUT' }, { timeout: 10 });
        return response?.data;
    } catch (err: any) {
        return err?.response?.data;
    }
};

export { GlobalGet, GlobalDelete, GlobalPost, GlobalPut };