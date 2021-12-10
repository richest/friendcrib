import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AlbumTableComponent } from '../../components/dashboard';
import { addDocumentTitle, clearCookies, clearSingleCookie, getCookie } from '../../functions';
import { albumTable, albumTabledata, networkErrorType , networkErrordata, saveThought ,loading ,checkListLength, albumLoadingData} from '../../redux/dashboard/albumReducer';
import axios from 'axios';
import { useHistory } from 'react-router';
import { authantication } from '../../redux/account/authReducer';


const Albums = () => {
    const dispatch = useDispatch();
    const history= useHistory();
    const albumTableProps = useSelector(albumTabledata);
    const networkErrorProp = useSelector(networkErrordata);
    const loadingData = useSelector(albumLoadingData);
    const albumListLengthProps = useSelector(checkListLength);

    const handleAlbumTable = () => {
        dispatch(loading(true))
        const bodyParameters = {
            session_id: getCookie("session_id"),
            type_id: 3
        }
        axios.post("http://167.172.209.57/friendcrib/backend/api/getData", bodyParameters)
            .then((response) => {
                dispatch(loading(false))
                if (response.data.status == 200 && response.data.success) {
                    dispatch(albumTable({ newState: response.data.data , is_list_empty: response.data.data.length == 0 ? true : false  }));
                    dispatch(networkErrorType({net_type:{ ...networkErrorProp ,  net_status: response.status  }}))
                }
                else {
                    dispatch(albumTable({ newState: [] ,  is_list_empty: false}));  
                    
                }
            }, (error) => {
                dispatch(albumTable({ newState: [] ,  is_list_empty: false}));
                dispatch(loading(false))
                if (error.toString().match("403")) {
                    dispatch(authantication({ is_auth: false }));
                    clearCookies();
                    history.push('/login');
                }
            });
    }

    useEffect(() => {
        addDocumentTitle("Albums")
        handleAlbumTable();

        return ()=> {dispatch(saveThought({ name: "", title: "" }));
        dispatch(networkErrorType({net_type: null}));
        dispatch(albumTable({ newState: [] ,  is_list_empty: false})); }
    }, [])

    return (
        <>
            <AlbumTableComponent
            albumTableProps={albumTableProps}
            saveThought={saveThought}
            dispatch={dispatch}
            history={history}
            loadingData={loadingData}
            albumListLengthProps={albumListLengthProps}/>
        </>
    )
}
export default Albums;