import { createSlice } from "@reduxjs/toolkit";

const networrkError = {
    net_status: "",
    net_message: ""
}
export const historyReducer = createSlice({
    name: "history",
    initialState: {
        historytable: [],
        networrkError,
        history_loading: false,
        is_list_empty: false
    },
    reducers: {
        historytable: (state, action) => {
            state.historytable = action.payload.newState;
            state.is_list_empty = action.payload.is_list_empty
        },
        historyNetworkError: (state, action) => {
            state.networrkError = !!action.payload.net_type ? action.payload.net_type :networrkError
        },
        history_loading: (state, action) => {
            state.history_loading = action.payload;
        }
    }
})
export const { historytable , historyNetworkError, saveThought, history_loading} = historyReducer.actions;

export const historyTabledata = (state) => state.history.historytable;
export const historyNetworkErrordata = (state) => state.history.networrkError;
export const historyLoadingData = (state) => state.history.history_loading;
export const historyListLength = (state) => state.history.is_list_empty;

export default historyReducer.reducer