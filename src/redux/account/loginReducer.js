import { createSlice } from "@reduxjs/toolkit";

const loginForm = {
    email: "",
    password: ""
}

export const loginReducer = createSlice({
    name: "login",
    initialState: {
        loginForm,
        is_loading: false
    },
    reducers: {
        login: (state, action) => {
            state.loginForm = !!action.payload.newState ? action.payload.newState : loginForm;
        },
        loading: (state, action) => {
            state.is_loading = action.payload.is_loading;
        }
    }
})
export const { login, loading } = loginReducer.actions;

export const loginData = (state) => state.login.loginForm;
export const loginLoadingData = (state) => state.login.is_loading;
export default loginReducer.reducer;