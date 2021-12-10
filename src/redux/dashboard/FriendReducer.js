import { createSlice } from "@reduxjs/toolkit";

const inviteFriendForm = {
    email: "",
    note: ""
}
const networrkError = {
    net_status: "",
    net_message: ""
}

export const FriendReducer = createSlice({
    name: "friend",
    initialState: {
        inviteFriendForm,
        friendTable :[],
        is_loading: false,
        networrkError,
        is_list_empty: false
    },
    reducers: {
        inviteFriend: (state, action) => {
            state.inviteFriendForm = !!action.payload.newState ? action.payload.newState : inviteFriendForm;
        },
        friendTable: (state, action) => {
            state.friendTable = action.payload.newState;
            state.is_list_empty = action.payload.is_list_empty
        },
        loading: (state, action) => {
            state.is_loading = action.payload.is_loading;
        },
        networkErrorType: (state, action) => {
            state.networrkError = !!action.payload.net_type ? action.payload.net_type :networrkError
        }
    }
})
export const { inviteFriend, loading, networkErrorType , friendTable} = FriendReducer.actions;

export const inviteFriendData = (state) => state.friend.inviteFriendForm;
export const friendTableData = (state) => state.friend.friendTable;
export const FriendLoadingData = (state) => state.friend.is_loading;
export const networkErrordata = (state) => state.friend.networrkError;
export const checkListLength = (state) => state.friend.is_list_empty;

export default FriendReducer.reducer;