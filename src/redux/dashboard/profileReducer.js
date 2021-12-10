import { createSlice } from "@reduxjs/toolkit";

export const profileReducer = createSlice({
    name: "profile",
    initialState: {
        cribFavDetail: [],
        is_loading: false,
        thought: { name: "", title: "" },
        is_list_empty: false
    },
    reducers: {
        cribFavourite: (state, action) => {
            state.cribFavDetail = action.payload.newState;
            state.is_list_empty = action.payload.is_list_empty
        },
        loading: (state, action) => {
            state.is_loading = action.payload;
        },
        saveThought: (state, action) => {
            state.thought = action.payload;
        },
        setIsListEmpty: (state, action) => {
            state.is_list_empty = action.payload;
        }
    }
})
export const { cribFavourite, loading, saveThought, setIsListEmpty } = profileReducer.actions;

export const cribFavData = (state) => state.profile.cribFavDetail;
export const profileLoadingData = (state) => state.profile.is_loading;
export const thoughtData = (state) => state.profile.thought;
export const profileListLength = (state) => state.profile.is_list_empty;

export default profileReducer.reducer;