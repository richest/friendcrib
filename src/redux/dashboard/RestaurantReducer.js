import { createSlice } from "@reduxjs/toolkit";

const networrkError = {
    net_status: "",
    net_message: ""
}
export const RestaurantReducer = createSlice({
    name: "restaurant",
    initialState: {
        restauranttable: [],
        networrkError,
        thought: { name: "", title: "" },
        is_loading: false,
        is_list_empty: false
    },
    reducers: {
        restauranttable: (state, action) => {
            state.restauranttable = action.payload.newState;
            state.is_list_empty = action.payload.is_list_empty
        },
        networkErrorType: (state, action) => {
            state.networrkError = !!action.payload.net_type ? action.payload.net_type : networrkError
        },
        saveThought: (state, action) => {
            state.thought = action.payload
        },
        loading: (state, action) => {
            state.is_loading = action.payload;
        }
    }
})
export const { restauranttable, networkErrorType, saveThought, loading } = RestaurantReducer.actions;

export const restaurantTableData = (state) => state.restaurant.restauranttable;
export const networkErrordata = (state) => state.restaurant.networrkError;
export const thoughtData = (state) => state.restaurant.thought;
export const restaurdantLoadingData = (state) => state.restaurant.is_loading;
export const checkListLength = (state) => state.restaurant.is_list_empty;

export default RestaurantReducer.reducer;