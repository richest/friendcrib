import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PodcastTableComponent } from '../../components/dashboard';
import { addDocumentTitle, getCookie } from '../../functions';
import { podcasttable, podcastTableData, networkErrorType, networkErrordata, saveThought, loading, checkListLength,
    podcastLoadingData } from '../../redux/dashboard/podcastReducer';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router';

const Podcast = () => {
    const dispatch = useDispatch();
    const history= useHistory();
    const podcastTableProps = useSelector(podcastTableData);
    const networkErrorProp = useSelector(networkErrordata);
    const loadingData = useSelector(podcastLoadingData);
    const podcastTableLengthProps = useSelector(checkListLength);

    const handlePodcastTable = () => {
        dispatch(loading(true))
        const bodyParameters = {
            session_id: getCookie("session_id"),
            type_id: 6
        }
        axios.post("http://167.172.209.57/friendcrib/backend/api/getData", bodyParameters)
            .then((response) => {
                dispatch(loading(false))
                if (response.status == 200 && !response.error) {
                    dispatch(podcasttable({ newState: response.data.data , is_list_empty: response.data.data.length == 0 ? true : false}));
                    dispatch(networkErrorType({ net_type: { ...networkErrorProp, net_status: response.status } }))
                }
                else {
                    dispatch(podcasttable({ newState:[], is_list_empty: false}));
                }
            }, (error) => {
                dispatch(loading(false));
                dispatch(podcasttable({ newState:[], is_list_empty: false}));
            });
    }

    useEffect(() => {
        addDocumentTitle("Podcast");
        handlePodcastTable();

        return () => {dispatch(saveThought({ name: "", title: "" }));
        dispatch(networkErrorType({ net_type: null }))
        dispatch(podcasttable({ newState: [],  is_list_empty: false }));}
    }, [])
    return (
        <>
            <PodcastTableComponent
                podcastTableProps={podcastTableProps}
                saveThought={saveThought}
                dispatch={dispatch}
                loadingData={loadingData} 
                history={history}
                podcastTableLengthProps={podcastTableLengthProps}/>
        </>
    )
}
export default Podcast;