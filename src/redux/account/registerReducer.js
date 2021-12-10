import { createSlice } from "@reduxjs/toolkit";

const registerForm = {
    username: "",
    email: "",
    city: "",
    country: "US",
    password: "",
    confirmPassword: ""
}

export const registerReducer = createSlice({
    name: "register",
    initialState: {
        registerForm ,
        is_loading: false,
        countries_list: [],
        cities_list: []
    },
    reducers: {
        register: (state, action) => {
            state.registerForm = !!action.payload.newState ? action.payload.newState : registerForm;
        },
        loading: (state, action) => {
            state.is_loading = action.payload.is_loading;
        },
        countries: (state, action) => {
            state.countries_list = action.payload.countries;
        },
        cities: (state, action) => {
            state.cities_list = action.payload.cities;
        }
    }
})
export const { register , loading, countries, cities } = registerReducer.actions;

export const registerData = (state) => state.register.registerForm;
export const registerLoadingData =(state) => state.register.is_loading;
export const countriesData =(state) => state.register.countries_list;
export const citiesData =(state) => state.register.cities_list;
export default registerReducer.reducer;