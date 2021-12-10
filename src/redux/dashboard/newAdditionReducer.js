import { createSlice } from "@reduxjs/toolkit";

const newAdditionForm = {
    title: "",
    url: "",
    type: {name: "Movies" ,value: ""},
    genre: "",
    thoughts: ""
}

const networrkError = {
    net_status: "",
    net_message: ""
}
export const newAdditionReducer = createSlice({
    name: "newAddition",
    initialState: {
        newAdditionForm,
        is_loading: false,
        genre_list: [],
        networrkError,
        favorite : { message: "", check: false}
    },
    reducers: {
        newAddition: (state, action) => {
            state.newAdditionForm = !!action.payload.newState ? action.payload.newState : newAdditionForm;
        },
        loading: (state, action) => {
            state.is_loading = action.payload.is_loading;
        },
        genreList: (state, action) => {
            state.genre_list = action.payload.genre_list;
        },
        networkErrorType: (state, action) => {
            state.networrkError = !!action.payload.net_type ? action.payload.net_type :networrkError
        },
        networkErrorType: (state, action) => {
            state.networrkError = !!action.payload.net_type ? action.payload.net_type :networrkError
        },
        getFavourite : (state, action) => {
            state.favorite = action.payload
        }
    }
})
export const { newAddition, loading, genreList, networkErrorType , singleFetchUser , getFavourite } = newAdditionReducer.actions;

export const newadditionData = (state) => state.newAddition.newAdditionForm;
export const additionLoadingData = (state) => state.newAddition.is_loading;
export const genreListData = (state) => state.newAddition.genre_list;
export const networkErrordata = (state) => state.newAddition.networrkError;
export const getFavouriteData =(state) => state.newAddition.favorite;

export default newAdditionReducer.reducer;