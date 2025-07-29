import { AxiosResponse } from "axios";
import { AxiosInstance } from "../util";
import { apiErrorHandler, ApiResponse } from "./AuthService";

export interface TrendItem {
  year: number;
  month: number;
  total: number;
}

export interface RangeItem {
    previous: number,
    current: number,
    difference: number,
    ratio: number,
    total: number
}

export interface AttendanceItem {
  year: number;
  month: number;
  present: string;
  absent: string;
}

export interface AppMessagesStats {
  sendCount: number;
  sendTrend: TrendItem[];
  pendingApprovalCount: number;
  pendingApprovalTrend: TrendItem[];
}

export interface PaymentStats {
  count: number;
  trend: TrendItem[];
}

export interface DashboardStatObject {
  payment: PaymentStats;
  appMessages: AppMessagesStats;
  teachers: RangeItem;
  students: RangeItem,
  parents: RangeItem;
  enrollment: RangeItem,
  levels: number;
  levelStreams: number;
  programs: number;
  attendance: AttendanceItem[];
}

export const fetchDashboardStat = async (monthsAgo: number, token : string | any): Promise<ApiResponse> => {
     try {
        const response: AxiosResponse<any> = await AxiosInstance.get(`/statistics/dashboard?monthsAgo=${monthsAgo}`, {
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