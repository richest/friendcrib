import { createSlice } from "@reduxjs/toolkit";
const networrkError = {
    net_status: "",
    net_message: ""
}

export const articleReducer = createSlice({
    name: "article",
    initialState: {
        articletable: [],
        networrkError,
        thought: { name: "", title: ""},
        is_loading: false,
        is_list_empty: false
    },
    reducers: {
        articletable: (state, action) => {
            state.articletable = action.payload.newState;
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
export const { articletable, networkErrorType ,saveThought , loading } = articleReducer.actions;

export const articleTableData = (state) => state.article.articletable;
export const networkErrordata = (state) => state.article.networrkError;
export const thoughtData = (state) => state.article.thought;
export const articleLoadingData = (state) => state.article.is_loading;
export const checkListLength = (state) => state.article.is_list_empty;

export default articleReducer.reducer;