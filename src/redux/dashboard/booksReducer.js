import { createSlice } from "@reduxjs/toolkit";

const networrkError = {
    net_status: "",
    net_message: ""
}
export const bookReducer = createSlice({
    name: "book",
    initialState: {
        booktable: [],
        networrkError,
        thought: { name: "", title: "" },
        is_loading: false,
        is_list_empty: false
    },
    reducers: {
        booktable: (state, action) => {
            state.booktable = action.payload.newState;
            state.is_list_empty = action.payload.is_list_empty
        },
        networkErrorType: (state, action) => {
            state.networrkError = !!action.payload.net_type ? action.payload.net_type : networrkError
        },
        saveThought: (state, action) => {
            state.thought = action.payload;
        },
        loading: (state, action) => {
            state.is_loading = action.payload;
        }
    }
})
export const { booktable, networkErrorType, saveThought, loading } = bookReducer.actions;

export const bookTableData = (state) => state.book.booktable;
export const networkErrordata = (state) => state.book.networrkError;
export const thoughtData = (state) => state.book.thought;
export const bookLoadingData = (state) => state.book.is_loading;
export const checkListLength = (state) => state.book.is_list_empty;

export default bookReducer.reducer;