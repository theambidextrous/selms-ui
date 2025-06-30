import axios, { AxiosResponse } from "axios";
import { AxiosInstance } from "../util";

export interface LoginRequest {
    email: string,
    password: string
}

export interface ApiResponse {
    success: boolean, 
    message: string,
    errors: any[],
    data: any
}

export const login = async (reqBody : LoginRequest): Promise<ApiResponse> => {
     try {
        const response: AxiosResponse<any> = await AxiosInstance.post('/users/signin', reqBody);
        console.log("response.data;", JSON.stringify(response.data));
        return {
            success: true, 
            message: 'success', 
            errors: [], 
            data: response.data 
        }
    } catch (error) {
        return apiErrorHandler(error);
    }
}

export const apiErrorHandler = (error: any): ApiResponse => {
    if(axios.isAxiosError(error)){
        let msg = error.message;
        let errorsList = [];
        if( error.response && error.response.data ){
            const  { message, errors } = error.response.data;
            msg = message;
            errorsList = errors;
        }
        return {
            success: false, 
            message: msg,
            errors: errorsList,
            data: null
        }
    }
    return {
        success: false, 
        message: String(error),
        errors: [],
        data: null
    }
}