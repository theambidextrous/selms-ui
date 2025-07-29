import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { DashboardStatObject } from '../../service/DashboardStatService';

interface StatsState {
    data: DashboardStatObject | undefined
}

const initialState = {
    data: undefined
} as StatsState

const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {
        keepStats: (state, action: PayloadAction<DashboardStatObject>) => {
            return {...state, data: action.payload}
        },
    },
});

const { keepStats } = statsSlice.actions;
const statsReducer = statsSlice.reducer;

export { keepStats, statsReducer };
