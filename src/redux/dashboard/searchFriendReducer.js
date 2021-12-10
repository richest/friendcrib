import { createSlice } from "@reduxjs/toolkit";

export const searchFriendReducer = createSlice({
    name: "searchFriend",
    initialState: {
        searchfriendTable:[],
        searchName: "",
        is_loading: false,
        is_list_empty: false
    },
    reducers: {
        searchfriendName: (state, action) => {
            state.searchName = action.payload ;
        },
        searchFriendTable : (state , action) => {
            state.searchfriendTable = action.payload.newState;
            state.is_list_empty = action.payload.is_list_empty
        },
        loading: (state, action) => {
            state.is_loading = action.payload;
        },

    }
})
export const { searchfriendName , searchFriendTable , loading } = searchFriendReducer.actions;

export const searchfriendNameData = (state) => state.searchFriend.searchName;
export const searchFriendtableData = (state) => state.searchFriend.searchfriendTable;
export const searchLoadingData = (state) => state.searchFriend.is_loading;
export const checkListLength = (state) => state.searchFriend.is_list_empty;

export default searchFriendReducer.reducer;