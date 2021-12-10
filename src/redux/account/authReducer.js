import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../../functions";

export const authReducer = createSlice({
    name: "auth",
    initialState: {
        is_authanticated: !!getCookie("session_id") ? true : false
    },
    reducers: {
        authantication: (state, action) => {
            state.is_authanticated = action.payload.is_auth;
        }
    }
})
export const { authantication } = authReducer.actions;

export const userAuth = (state) => state.auth.is_authanticated;
export default authReducer.reducer;