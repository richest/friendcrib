import React, { useEffect, useRef } from 'react';
import { addDocumentTitle, getCookie, replceMultiStringWithSIngle } from '../../functions';
import { loading, searchLoadingData, searchfriendName, searchFriendTable, searchfriendNameData,
    searchFriendtableData  , checkListLength} from '../../redux/dashboard/searchFriendReducer';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { SearchTableComponent } from '../../components/dashboard';
import { useHistory } from 'react-router';
import { useToasts } from 'react-toast-notifications';

const SearchFriend = () => {
    const { addToast } = useToasts();
    const dispatch = useDispatch();
    const history = useHistory();
    const searchfriendNameProp = useSelector(searchfriendNameData);
    const searchTableProp = useSelector(searchFriendtableData);
    const loadingData = useSelector(searchLoadingData);
    const checkListLengthProps = useSelector(checkListLength);
    const searchNameEl = useRef(null);

    const handleSearchFriend = (e) => {
        getSearchFriendList();

    }

    const getSearchFriendList = () => {
        const search = replceMultiStringWithSIngle(searchfriendNameProp)
        if (!!search && search !== " ") {
            dispatch(loading(true));
            const bodyParameters = {
                session_id: getCookie("session_id"),
                search
            }
            axios.post("http://167.172.209.57/friendcrib/backend/api/searchfriend", bodyParameters)
                .then((response) => {
                    dispatch(loading(false));
                    if (response.data.status == 200 && response.data.success) {
                        dispatch(searchFriendTable({ newState: response.data.data , is_list_empty: response.data.data.length == 0 ? true : false }));
                    }
                    else {
                        dispatch(searchFriendTable({ newState: [], is_list_empty: false }));
                    }
                }, (error) => {
                    dispatch(loading(false));
                    dispatch(searchFriendTable({ newState: [], is_list_empty: false }));
                });
        }
    }

    const sendFriendRequest = (Id) => {
        const bodyParameters = {
            session_id: getCookie("session_id"),
            friend_id: Id
        }
        axios.post("http://167.172.209.57/friendcrib/backend/api/SendFriendInvite", bodyParameters)
            .then((response) => {
                if (response.data.status == 200 && response.data.success) {
                    getSearchFriendList();
                    addToast(response.data.message, {
                        appearance: 'success',
                        autoDismiss: true,
                      });
                    // for (let i in searchTableProp) {
                    //     if (bodyParameters.friend_id == searchTableProp[i].id) {
                    //         getSearchFriendList(dispatch, searchfriendNameProp)
                    //     }
                    // }
                }
                else {
                    addToast(response.data.message, {
                        appearance: 'error',
                        autoDismiss: true,
                      });
                }
            }, (error) => {
                addToast(error.message, {
                    appearance: 'error',
                    autoDismiss: true,
                  });
            });
    }

    useEffect(() => {
        handleSearchFriend();
        addDocumentTitle("Search Friends");
        return () => {
            dispatch(searchFriendTable({ newState: [],  is_list_empty: false }))
        }
    }, [])

    return (
        <>
            <SearchTableComponent searchTableProp={searchTableProp}
                loadingData={loadingData}
                sendFriendRequest={sendFriendRequest}
                history={history}
                checkListLengthProps={checkListLengthProps}
            />

        </>
    )
}
export default SearchFriend;