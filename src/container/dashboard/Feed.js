import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { FeedTableComponent } from '../../components/dashboard';
import { addDocumentTitle, clearCookies, clearSingleCookie, getCookie } from '../../functions';
import { authantication } from '../../redux/account/authReducer';
import { feedtable, feedTableData, saveThought, loading, feedLoadingData , FeedListLength} from '../../redux/dashboard/FeedReducer';
import { historytable, historyTabledata , history_loading, historyLoadingData , historyListLength } from '../../redux/dashboard/historyReducer';

const Feed = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const FeedTableProps = useSelector(feedTableData);
    const historyTableProps = useSelector(historyTabledata);
    const feed_loading = useSelector(feedLoadingData);
    const his_loading = useSelector(historyLoadingData);
    const feedListLengthProps = useSelector(FeedListLength);
    const historyListLengthProps = useSelector(historyListLength);

    const handleFeedTable = () => {
        dispatch(loading(true))
        const bodyParameters = {
            session_id: getCookie("session_id")
        }
        axios.post("http://167.172.209.57/friendcrib/backend/api/latestCrib/1", bodyParameters)
            .then((response) => {
                dispatch(loading(false))
                if (response.status == 200 && !response.error) {
                    dispatch(feedtable({ newState: response.data.data.list , is_list_empty: response.data.data.list.length == 0 ? true : false }));
                }
                else {
                    dispatch(feedtable({ newState: [] , is_list_empty: false}));
                }
            }, (error) => {
                dispatch(feedtable({ newState: [] , is_list_empty: false}));
                dispatch(loading(false));
                if (error.toString().match("403")) {
                    dispatch(authantication({ is_auth: false }));
                    clearCookies();
                    history.push('/login');
                }
            });
    }
    const handleHistoryTable = () => {
        dispatch(history_loading(true))
        const bodyParameters = {
            session_id: getCookie("session_id")
        }
        axios.post("http://167.172.209.57/friendcrib/backend/api/latestCrib/2", bodyParameters)
            .then((response) => {
                dispatch(history_loading(false))
                if (response.status == 200 && !response.error) {
                    dispatch(historytable({ newState: response.data.data.list, is_list_empty: response.data.data.list.length == 0 ? true : false  }));

                }
                else{
                    dispatch(historytable({ newState: [], is_list_empty:  false  }));
                }
            }, (error) => {
                dispatch(historytable({ newState: [] , is_list_empty:  false  }));
                dispatch(history_loading(false));
                if (error.toString().match("403")) {
                    dispatch(authantication({ is_auth: false }));
                    clearCookies();
                    history.push('/login');
                }
            });
    }

    useEffect(() => {
        addDocumentTitle("Home")
        handleFeedTable();
        handleHistoryTable();

        return () => {
            dispatch(saveThought({ name: "", title: "" }));
            dispatch(feedtable({ newState: [] ,  is_list_empty: false}));
            dispatch(historytable({ newState: [],  is_list_empty: false }));
        }
    }, [])
    return (
        <>
            <div className="feeds-tab position-sticky">
                <ul className="nav mb-0" id="pills-tab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Feed</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link " id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">History</a>
                    </li>
                </ul>
            </div>
            <FeedTableComponent FeedTableProps={FeedTableProps}
                historyTableProps={historyTableProps}
                saveThought={saveThought}
                feed_loading={feed_loading}
                his_loading={his_loading}
                dispatch={dispatch}
                history={history}
                feedListLengthProps={feedListLengthProps}
                historyListLengthProps={historyListLengthProps}
            />
        </>
    )
}
export default Feed;