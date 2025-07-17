import { AxiosResponse } from "axios";
import { AxiosInstance } from "../util";
import { apiErrorHandler, ApiResponse } from "./AuthService";
import { AppUserObject } from "../pages/UsersManagement";

export const fetchAllAppAdmins = async (token : string | any): Promise<ApiResponse> => {
     try {
        const response: AxiosResponse<any> = await AxiosInstance.get('/administrators/findall', {
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

export const fetchAllAppUsers = async (token : string | any): Promise<ApiResponse> => {
     try {
        const response: AxiosResponse<any> = await AxiosInstance.get('/administrators/all', {
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

export const addNewAppUser = async (token : string | any, body: AppUserObject): Promise<ApiResponse> => {
     try {
        const response: AxiosResponse<any> = await AxiosInstance.post('/administrators/add', 
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

export const editAppUser = async (id: number, token : string | any, body: AppUserObject): Promise<ApiResponse> => {
     try {
        const response: AxiosResponse<any> = await AxiosInstance.post(`/administrators/edit/${id}`, 
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

export const AppUserTypes = [
    // {
    //     value: 1,
    //     label: 'App Admin'
    // },
    {
        value: 2,
        label: 'Library Admin'
    },
    {
        value: 3,
        label: 'Finance Admin'
    },
    {
        value: 4,
        label: 'Parent'
    }
]