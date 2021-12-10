import { createSlice } from "@reduxjs/toolkit";

const networrkError = {
    net_status: "",
    net_message: ""
}
export const FeedReducer = createSlice({
    name: "feed",
    initialState: {
        feedtable: [],
        networrkError,
        thought: { name: "", title: ""},
        is_loading: false,
        is_toggleLoading: false,
        is_list_empty: false
    },
    reducers: {
        feedtable: (state, action) => {
            state.feedtable = action.payload.newState;
            state.is_list_empty = action.payload.is_list_empty
        },
        feedNetworkError: (state, action) => {
            state.networrkError = !!action.payload.net_type ? action.payload.net_type :networrkError
        },
        saveThought: (state, action) => {
            state.thought = action.payload;
        },
        loading: (state, action) => {
            state.is_loading = action.payload;
        },
        toggleLoading: (state, action) => {
            state.is_toggleLoading = action.payload;
        }
    }
})
export const { feedtable, feedNetworkError ,saveThought, loading, toggleLoading } = FeedReducer.actions;

export const feedTableData = (state) => state.feed.feedtable;
export const feedNetworkErrordata = (state) => state.feed.networrkError;
export const thoughtData = (state) => state.feed.thought;
export const feedLoadingData = (state) => state.feed.is_loading;
export const toggleLoadingData = (state) => state.feed.is_toggleLoading;
export const FeedListLength = (state) => state.feed.is_list_empty;

export default FeedReducer.reducer