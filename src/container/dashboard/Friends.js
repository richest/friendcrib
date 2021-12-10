import React, { useEffect } from 'react';
import { FriendTableComponent } from '../../components/dashboard';
import { addDocumentTitle, clearSingleCookie, getCookie } from '../../functions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { friendTable, friendTableData, loading, FriendLoadingData, checkListLength } from '../../redux/dashboard/FriendReducer';
import { authantication } from '../../redux/account/authReducer';
import { useHistory } from 'react-router';

const Friends = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const friendTableProps = useSelector(friendTableData);
    const loadingData = useSelector(FriendLoadingData);
    const friendTableLengthProps = useSelector(checkListLength);

    const handleFriendList = () => {
        dispatch(loading({ is_loading: true }))
        const bodyParameters = {
            session_id: getCookie("session_id"),
        }
        axios.post("http://167.172.209.57/friendcrib/backend/api/friendlist", bodyParameters)
            .then((response) => {
                dispatch(loading({ is_loading: false }))
                if (response.data.status == 200 && response.data.success) {

                    dispatch(friendTable({ newState: response.data.data, is_list_empty: response.data.data.length == 0 ? true : false }))
                }
                else {
                    dispatch(friendTable({ newState: [], is_list_empty: false }))
                }
            }, (error) => {
                dispatch(loading({ is_loading: false }))
                dispatch(friendTable({ newState: [], is_list_empty: false }))
                if (error.toString().match("403")) {
                    dispatch(authantication({ is_auth: false }));
                    clearSingleCookie('profile');
                    clearSingleCookie('session_id')
                    history.push('/login');
                }
            });
    }
    useEffect(() => {
        addDocumentTitle("Friends");
        handleFriendList();
        return () => {
            dispatch(friendTable({ newState: [],  is_list_empty: false }))
        }
    }, [])

    return (
        <>
            <FriendTableComponent friendTableProps={friendTableProps}
                history={history}
                loadingData={loadingData}
                friendTableLengthProps={friendTableLengthProps} />
        </>
    )
}
export default Friends;