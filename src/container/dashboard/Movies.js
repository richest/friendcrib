import React, { useEffect } from 'react';
import { MoviesTableComponent } from '../../components/dashboard';
import { addDocumentTitle, getCookie } from '../../functions';
import axios from 'axios';
import { movietable, movieTableData, networkErrorType, networkErrordata, saveThought,checkListLength, loading, movieLoadingData } from '../../redux/dashboard/movieReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const Movies = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const movieTableProps = useSelector(movieTableData);
    const networkErrorProp = useSelector(networkErrordata);
    const loadingData = useSelector(movieLoadingData);
    const movieTableLengthProps = useSelector(checkListLength);

    const handleMovieTable = () => {
        dispatch(loading(true));
        const bodyParameters = {
            session_id: getCookie("session_id"),
            type_id: 1
        }
        axios.post("http://167.172.209.57/friendcrib/backend/api/getData", bodyParameters)
            .then((response) => {
                 dispatch(loading(false));
                if (response.data.status == 200 && response.data.success) {
                    dispatch(movietable({ newState: response.data.data , is_list_empty: response.data.data.length == 0 ? true : false}));
                    dispatch(networkErrorType({ net_type: { ...networkErrorProp, net_status: response.status } }))
                }
                else {
                    dispatch(movietable({ newState: [] , is_list_empty: false}));
                    dispatch(networkErrorType({ net_type: { ...networkErrorProp, net_status: response.status } }))
                }
            }, (error) => {
                dispatch(loading(false))
                dispatch(movietable({ newState: [] , is_list_empty: false}));
                dispatch(networkErrorType({ net_type: { ...networkErrorProp, net_status: error.status } }))
            });
    }

    
    useEffect(() => {
        addDocumentTitle("Movies");
        handleMovieTable();

        return () => {dispatch(saveThought({ name: "", title: "" }));
        dispatch(movietable({ newState: [],  is_list_empty: false }));
        dispatch(networkErrorType({ net_type: null }));}
    }, [])
    return (
        <>
            <MoviesTableComponent
                movieTableProps={movieTableProps}
                saveThought={saveThought}
                dispatch={dispatch}
                loadingData={loadingData}
                history={history}
                movieTableLengthProps={movieTableLengthProps}
                />
        </>
    )
}
export default Movies;