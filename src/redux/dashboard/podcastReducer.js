import { createSlice } from "@reduxjs/toolkit";

const networrkError = {
    net_status: "",
    net_message: ""
}
export const podcastReducer = createSlice({
    name: "podcast",
    initialState: {
         podcasttable: [],
         networrkError,
         thought: { name: "", title: ""},
         is_loading: false,
         is_list_empty: false

    },
    reducers: {
        podcasttable: (state, action) => {
            state.podcasttable = action.payload.newState;
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
export const { podcasttable , networkErrorType, saveThought, loading}  = podcastReducer.actions;

export const podcastTableData = (state) => state.podcast.podcasttable;
export const networkErrordata = (state) => state.podcast.networrkError;
export const thoughtData = (state) => state.podcast.thought;
export const podcastLoadingData = (state) => state.podcast.is_loading;
export const checkListLength = (state) => state.podcast.is_list_empty;

export default podcastReducer.reducer;