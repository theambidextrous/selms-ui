import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
    accessToken: string | null,
    refreshToken: string | null,
    accessExpiresIn: number | null,
    refreshExpiresIn: number | null,
    accessExpiresAt: number | null,
    refreshExpiresAt: number | null,
}

const initialState: AuthState = {
    accessToken: null,
    refreshToken: null,
    accessExpiresIn: null,
    refreshExpiresIn: null,
    accessExpiresAt: null,
    refreshExpiresAt: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        keep: (state, action: PayloadAction<AuthState>) => {
            return action.payload;
        },
    },
});

const { keep } = authSlice.actions;
const authReducer = authSlice.reducer;

export { keep, authReducer };
