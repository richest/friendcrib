import { createSlice } from "@reduxjs/toolkit";


export const notificationReducer = createSlice({
    name: "notification",
    initialState: {
       onScreenNotification: [],
       totalNotificationCount: "",
       is_loading: false,
       allNotification: [],
       acceptnotificationid : "",
       declinenotificationid : "",
       is_list_empty: false
    },
    reducers: {
        onScreenNotification: (state, action) => {
            state.onScreenNotification = action.payload.newState;
        },
        totalNotificationCount: (state, action) => {
            state.totalNotificationCount = action.payload;
        },
        loading: (state, action) => {
            state.is_loading = action.payload;
        },
        allNotificationTable: (state, action) => {
            state.allNotification = action.payload.newState;
            state.is_list_empty = action.payload.is_list_empty
        },
        acceptNotificationId: (state, action) => {
            state.acceptnotificationid = action.payload;
        },
        declineNotificationId: (state, action) => {
            state.declinenotificationid = action.payload;
        }
    }
})
export const { onScreenNotification , totalNotificationCount , loading , allNotificationTable ,
    acceptNotificationId , declineNotificationId} = notificationReducer.actions;
export const onScreenNotidata = (state) => state.notification.onScreenNotification;
export const totalNotiCountData = (state) => state.notification.totalNotificationCount;
export const notifiLoadingData = (state) => state.notification.is_loading;
export const allNoticationTableData = (state) => state.notification.allNotification;
export const acceptNotifiIdData = (state) => state.notification.acceptnotificationid;
export const declineNotifiIdData = (state) => state.notification.declinenotificationid;
export const checkListLength = (state) => state.notification.is_list_empty;

export default notificationReducer.reducer