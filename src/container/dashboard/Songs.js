import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SongsTableComponent } from '../../components/dashboard';
import { addDocumentTitle, getCookie } from '../../functions';
import { songtable, songTableData, networkErrorType, networkErrordata, saveThought, loading, songLoadingData , checkListLength } from '../../redux/dashboard/songsReducer';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router';

const Songs = () => {
    const dispatch = useDispatch();
    const history= useHistory();
    const songTableProps = useSelector(songTableData);
    const networkErrorProp = useSelector(networkErrordata);
    const loadingData = useSelector(songLoadingData);
    const songsTableLengthProps = useSelector(checkListLength);

    const handleSongTable = () => {
        dispatch(loading(true))
        const bodyParameters = {
            session_id: getCookie("session_id"),
            type_id: 2
        }
        axios.post("http://167.172.209.57/friendcrib/backend/api/getData", bodyParameters)
            .then((response) => {
                dispatch(loading(false))
                if (response.status == 200 && !response.error) {
                    dispatch(songtable({ newState: response.data.data , is_list_empty: response.data.data.length == 0 ? true : false }));
                    dispatch(networkErrorType({ net_type: { ...networkErrorProp, net_status: response.status } }))
                }
                else {
                    dispatch(songtable({ newState: [] , is_list_empty:  false }));
                }
            }, (error) => {
                dispatch(songtable({ newState: [] , is_list_empty:  false }));
                dispatch(loading(false))
            });
    }
   
    useEffect(() => {
        addDocumentTitle("Songs");
        handleSongTable();

        return () => {dispatch(saveThought({ name: "", title: "" }));
        dispatch(networkErrorType({ net_type: null }))
        dispatch(songtable({ newState: [],  is_list_empty: false }));}
    }, [])
    return (
        <>
            <SongsTableComponent
                songTableProps={songTableProps}
                saveThought={saveThought}
                dispatch={dispatch}
                loadingData={loadingData}
                history={history}
                songsTableLengthProps={songsTableLengthProps}/>
        </>
    );
}
export default Songs;