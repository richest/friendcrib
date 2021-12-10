import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { AllNotificationComponent } from '../../components/dashboard';
import { getCookie } from '../../functions';
import {onScreenNotification, totalNotificationCount, allNotificationTable, allNoticationTableData, loading, notifiLoadingData, acceptNotificationId,
    declineNotificationId, acceptNotifiIdData, declineNotifiIdData , checkListLength
} from '../../redux/dashboard/notificationReducer'

const AllNotification = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const allNotificationProp = useSelector(allNoticationTableData);
    const loadingData = useSelector(notifiLoadingData);
    const acceptNotifiId = useSelector(acceptNotifiIdData);
    const declineNotifiId = useSelector(declineNotifiIdData);
    const notiTableLengthProps = useSelector(checkListLength);

    useEffect(() => {
        handleAllNotification();
        handleMarkAsRead();
        return () => {
            dispatch(acceptNotificationId(""));
            dispatch(declineNotificationId(""));
            dispatch(allNotificationTable({ newState: [] ,  is_list_empty: false }));
        }
    }, [])

    const handleMarkAsRead = () => {
        const bodyParameters = {
            session_id: getCookie("session_id"),
        }
        axios.post("http://167.172.209.57/friendcrib/backend/api/markAllRead", bodyParameters)
            .then((response) => {
                if (response.data.status == 200 && response.data.success) {
                }
                else {

                }
            }, (error) => {

            });
    }
    const handleAllNotification = () => {
        dispatch(loading(true));
        const bodyParameters = {
            session_id: getCookie("session_id"),
        }
        axios.post("http://167.172.209.57/friendcrib/backend/api/getAllNotification", bodyParameters)
            .then((response) => {
                dispatch(loading(false));
                if (response.data.status == 200 && response.data.success) {
                    dispatch(allNotificationTable({ newState: response.data.data , is_list_empty: response.data.data.length == 0 ? true : false }));
                }
                else {
                    dispatch(allNotificationTable({ newState: [] , is_list_empty: false  }));
                }
            }, (error) => {
                dispatch(allNotificationTable({ newState: [] , is_list_empty: false }));
                dispatch(loading(false));
            });
    }
    const handleAcceptRequest = () => {
        const bodyParameters = {
            session_id: getCookie("session_id"),
            Notifications_id: acceptNotifiId
        }
        axios.post("http://167.172.209.57/friendcrib/backend/api/requestAccept", bodyParameters)
            .then((response) => {
                if (response.status == 200 && !response.error) {
                    handleAllNotification();
                }
                else {

                }
            }, (error) => {

            });
    }
    const handleDeclineRequest = () => {
        const bodyParameters = {
            session_id: getCookie("session_id"),
            Notifications_id: declineNotifiId
        }
        axios.post("http://167.172.209.57/friendcrib/backend/api/requestDecline", bodyParameters)
            .then((response) => {
                if (response.status == 200 && !response.error) {
                    handleAllNotification();
                }
                else {

                }
            }, (error) => {

            });
    }
    useEffect(() => {
        if (!!acceptNotifiId) {
            handleAcceptRequest();
        }
    }, [acceptNotifiId])
    useEffect(() => {
        if (!!declineNotifiId) {
            handleDeclineRequest();
        }
    }, [declineNotifiId])
    return (
        <AllNotificationComponent
            history={history}
            allNotificationProp={allNotificationProp}
            acceptNotificationId={acceptNotificationId}
            declineNotificationId={declineNotificationId}
            dispatch={dispatch}
            loadingData={loadingData}
            notiTableLengthProps={notiTableLengthProps}
        />
    )
}
export default AllNotification;