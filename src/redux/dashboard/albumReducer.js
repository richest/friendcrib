import { createSlice } from "@reduxjs/toolkit";

const networrkError = {
    net_status: "",
    net_message: ""
}
export const albumReducer = createSlice({
    name: "album",
    initialState: {
        albumtable: [],
        networrkError,
        thought: { name: "", title: ""},
        is_loading: false,
        is_list_empty: false
    },
    reducers: {
        albumTable: (state, action) => {
            state.albumtable = action.payload.newState;
            state.is_list_empty = action.payload.is_list_empty
        },
        networkErrorType: (state, action) => {
            state.networrkError = !!action.payload.net_type ? action.payload.net_type :networrkError
        },
        saveThought: (state, action) => {
            state.thought = action.payload
        },
        loading: (state, action) => {
            state.is_loading = action.payload;
        }
    }
})
export const { albumTable, networkErrorType, saveThought , loading} = albumReducer.actions;

export const albumTabledata = (state) => state.album.albumtable;
export const networkErrordata = (state) => state.album.networrkError;
export const thoughtData = (state) => state.album.thought;
export const albumLoadingData = (state) => state.album.is_loading;
export const checkListLength = (state) => state.album.is_list_empty;

export default albumReducer.reducer