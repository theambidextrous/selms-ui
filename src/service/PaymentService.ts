import { AxiosResponse } from "axios";
import { AxiosInstance } from "../util";
import { apiErrorHandler, ApiResponse } from "./AuthService";
import { PaymentsObject } from "../pages/Payment";

export const fetchAllPayments = async (token : string | any): Promise<ApiResponse> => {
     try {
        const response: AxiosResponse<any> = await AxiosInstance.get('/payments/findall', {
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

export const addNewPayment = async (token : string | any, body: PaymentsObject): Promise<ApiResponse> => {
     try {
        const response: AxiosResponse<any> = await AxiosInstance.post('/payments/add', 
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

export const editPayment = async (id: number, token : string | any, body: PaymentsObject): Promise<ApiResponse> => {
     try {
        const response: AxiosResponse<any> = await AxiosInstance.post(`/payments/edit/${id}`, 
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