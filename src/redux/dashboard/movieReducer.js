import { createSlice } from "@reduxjs/toolkit";

const networrkError = {
    net_status: "",
    net_message: ""
}
export const movieReducer = createSlice({
    name: "movie",
    initialState: {
        movietable: [],
        networrkError,
        thought: { name: "", title: ""},
        is_loading: false,
        movieSingle :"",
        is_list_empty: false
    },
    reducers: {
        movietable: (state, action) => {
            state.movietable = action.payload.newState;
            state.is_list_empty = action.payload.is_list_empty
        },
        networkErrorType: (state, action) => {
            state.networrkError = !!action.payload.net_type ? action.payload.net_type :networrkError
        },
        saveThought: (state, action) => {
            state.thought = action.payload;
        },
        loading: (state, action) => {
            state.is_loading = action.payload;
        }
    }
})
export const { movietable, networkErrorType , saveThought , loading} = movieReducer.actions;

export const movieTableData = (state) => state.movie.movietable;
export const networkErrordata = (state) => state.movie.networrkError;
export const thoughtData = (state) => state.movie.thought;
export const movieLoadingData = (state) => state.movie.is_loading;
export const checkListLength = (state) => state.movie.is_list_empty;

export default movieReducer.reducer;