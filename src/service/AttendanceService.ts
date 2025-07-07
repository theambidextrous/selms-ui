import { AxiosResponse } from "axios";
import { AxiosInstance } from "../util";
import { apiErrorHandler, ApiResponse } from "./AuthService";
import { AttendancesObject } from "../pages/Performance/Attendances";


export const fetchAllAttendances = async (token : string | any): Promise<ApiResponse> => {
     try {
        const response: AxiosResponse<any> = await AxiosInstance.get('/attendance/findall', {
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

export const addNewAttendance = async (token : string | any, body: AttendancesObject): Promise<ApiResponse> => {
     try {
        const response: AxiosResponse<any> = await AxiosInstance.post('/attendance/add', 
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

export const editAttendance = async (id: number, token : string | any, body: AttendancesObject): Promise<ApiResponse> => {
     try {
        const response: AxiosResponse<any> = await AxiosInstance.post(`/attendance/edit/${id}`, 
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