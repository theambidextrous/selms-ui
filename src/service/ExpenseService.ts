import { AxiosResponse } from "axios";
import { AxiosInstance } from "../util";
import { apiErrorHandler, ApiResponse } from "./AuthService";
import { ExpensesObject } from "../pages/Expenses";

export const fetchAllExpenses = async (token : string | any): Promise<ApiResponse> => {
     try {
        const response: AxiosResponse<any> = await AxiosInstance.get('/expenses/findall', {
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

export const addNewExpense = async (token : string | any, body: ExpensesObject): Promise<ApiResponse> => {
     try {
        const response: AxiosResponse<any> = await AxiosInstance.post('/expenses/add', 
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

export const editExpense = async (id: number, token : string | any, body: ExpensesObject): Promise<ApiResponse> => {
     try {
        const response: AxiosResponse<any> = await AxiosInstance.post(`/expenses/edit/${id}`, 
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