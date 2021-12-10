import { createSlice } from "@reduxjs/toolkit";

const networrkError = {
    net_status: "",
    net_message: ""
}
export const songReducer = createSlice({
    name: "song",
    initialState: {
        songtable: [],
        networrkError,
        thought: { name: "", title: ""},
        is_loading: false,
        is_list_empty: false
    },
    reducers: {
        songtable: (state, action) => {
            state.songtable = action.payload.newState;
            state.is_list_empty = action.payload.is_list_empty
        },
        networkErrorType: (state, action) => {
            state.networrkError = !!action.payload.net_type ? action.payload.net_type :networrkError;
        },
        saveThought: (state, action) => {
            state.thought = action.payload;
        },
        loading: (state, action) => {
            state.is_loading = action.payload;
        }
    }
})
export const { songtable, networkErrorType ,saveThought , loading } = songReducer.actions;

export const songTableData = (state) => state.song.songtable;
export const networkErrordata = (state) => state.song.networrkError;
export const thoughtData = (state) => state.song.thought;
export const songLoadingData = (state) => state.song.is_loading;
export const checkListLength = (state) => state.song.is_list_empty;

export default songReducer.reducer;