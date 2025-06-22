import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface UserState {
    isLoggedIn: boolean,
    userId: string | null,
    firstName: string | null,
    middleName: string | null,
    lastName: string | null,
    email: string | null,
    phone: string | null,
    country: string | null,
    agreedToTerms: boolean
}

const initialState: UserState = {
    isLoggedIn: false,
    userId: null,
    firstName: null,
    middleName: null,
    lastName: null,
    email: null,
    phone: null,
    country: null,
    agreedToTerms: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserState>) => {
            state = { ...state, ...action.payload, isLoggedIn: true};
        },
        logout: (state) => {
            state = initialState;
        },
    },
});

const { login, logout } = userSlice.actions;
const userReducer = userSlice.reducer;

export { login, logout, userReducer };
