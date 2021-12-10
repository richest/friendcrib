import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { BooksTableComponent } from '../../components/dashboard';
import { addDocumentTitle, clearCookies, getCookie } from '../../functions';
import { authantication } from '../../redux/account/authReducer';
import { booktable, bookTableData, networkErrorType, networkErrordata, saveThought, loading, bookLoadingData , checkListLength} from '../../redux/dashboard/booksReducer';


const Books = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const bookTableProps = useSelector(bookTableData);
    const networkErrorProp = useSelector(networkErrordata);
    const loadingData = useSelector(bookLoadingData);
    const bookTableLengthProps = useSelector(checkListLength);

    const handleBookTable = () => {
        dispatch(loading(true))
        const bodyParameters = {
            session_id: getCookie("session_id"),
            type_id: 5
        }
        axios.post("http://167.172.209.57/friendcrib/backend/api/getData", bodyParameters)
            .then((response) => {
                dispatch(loading(false))
                if (response.status == 200 && !response.error) {
                    dispatch(booktable({ newState: response.data.data, is_list_empty: response.data.data.length == 0 ? true : false }));
                    dispatch(networkErrorType({ net_type: { ...networkErrorProp, net_status: response.status } }))
                }
                else {
                    dispatch(booktable({ newState: [] , is_list_empty:false }));
                }
            }, (error) => {
                if (error.toString().match("403")) {
                    dispatch(authantication({ is_auth: false }));
                    clearCookies();
                    history.push('/login');
                }
                dispatch(booktable({ newState: [] , is_list_empty: false }));
                dispatch(loading(false))
            });
    }

    useEffect(() => {
        addDocumentTitle("Books")
        handleBookTable();

        return () => {dispatch(saveThought({ name: "", title: "" }));
        dispatch(networkErrorType({ net_type: null }))
        dispatch(booktable({ newState: [] ,  is_list_empty: false}));}
    }, [])
    return (
        <>
            <BooksTableComponent bookTableProps={bookTableProps}
                saveThought={saveThought}
                dispatch={dispatch}
                loadingData={loadingData}
                history={history}
                bookTableLengthProps={bookTableLengthProps}
                />
        </>
    )
}
export default Books;