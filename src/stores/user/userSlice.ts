import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


interface UserState {
    isLoggedIn: boolean,
    address: string,
    city: string,
    county: string,
    created_at: string,
    email: string,
    email_verified_at: string,
    fname: string,
    has_setup: boolean,
    id: number,
    is_active: boolean,
    is_admin: boolean,
    is_fin: boolean,
    is_lib: boolean,
    is_parent: boolean,
    is_super: boolean,
    is_teacher: boolean,
    lname: string
    phone: string
    pic: string
    updated_at: string
    zip: number
}

const initialState = { isLoggedIn: false } as UserState;

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogin: (state, action: PayloadAction<UserState>) => {
            return { ...state, ...action.payload, isLoggedIn: true};
        },
        userLogout: (state: UserState) => {
            return { ...state, isLoggedIn: false};
        },
    },
});

const { userLogin, userLogout } = userSlice.actions;
const userReducer = userSlice.reducer;

export { userLogin, userLogout, userReducer };
