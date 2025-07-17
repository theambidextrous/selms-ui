import { AxiosResponse } from "axios";
import { AxiosInstance } from "../util";
import { apiErrorHandler, ApiResponse } from "./AuthService";
import { FeesObject } from "../pages/Fee";

export const fetchAllFees = async (token : string | any): Promise<ApiResponse> => {
     try {
        const response: AxiosResponse<any> = await AxiosInstance.get('/fees/findall', {
            headers: { Authorization: `Bearer ${token}`}
        });
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

export const addNewFee = async (token : string | any, body: FeesObject): Promise<ApiResponse> => {
     try {
        const response: AxiosResponse<any> = await AxiosInstance.post('/fees/add', 
            body,
            {  headers: { Authorization: `Bearer ${token}`} }
        );
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

export const editFee = async (id: number, token : string | any, body: FeesObject): Promise<ApiResponse> => {
     try {
        const response: AxiosResponse<any> = await AxiosInstance.post(`/fees/edit/${id}`, 
            body,
            {  headers: { Authorization: `Bearer ${token}`} }
        );
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