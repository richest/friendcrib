import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { ArticleTableComponent } from '../../components/dashboard';
import { addDocumentTitle, clearCookies, getCookie } from '../../functions';
import { authantication } from '../../redux/account/authReducer';
import { articletable, articleTableData, networkErrorType, networkErrordata, saveThought, loading, checkListLength,
    articleLoadingData } from '../../redux/dashboard/articleReducer'

const Articles = () => {
    const dispatch = useDispatch();
    const history= useHistory();
    const articleTableProps = useSelector(articleTableData);
    const networkErrorProp = useSelector(networkErrordata);
    const loadingData = useSelector(articleLoadingData);
    const articleListLengthProps = useSelector(checkListLength);

    const handleArticleTable = () => {
        dispatch(loading(true));
        const bodyParameters = {
            session_id: getCookie("session_id"),
            type_id: 7
        }
        axios.post("http://167.172.209.57/friendcrib/backend/api/getData", bodyParameters)
            .then((response) => {
                dispatch(loading(false))
                if (response.status == 200 && !response.error) {
                    dispatch(articletable({ newState: response.data.data , is_list_empty: response.data.data.length == 0 ? true : false}));
                    dispatch(networkErrorType({ net_type: { ...networkErrorProp, net_status: response.status } }))
                }
                else {
                    dispatch(articletable({ newState: [] , is_list_empty: false}));
                }
            }, (error) => {
                if (error.toString().match("403")) {
                    dispatch(authantication({ is_auth: false }));
                    clearCookies();
                    history.push('/login');
                }
                dispatch(articletable({ newState: [] , is_list_empty: false}));
                dispatch(loading(false))
            });
    }

    useEffect(() => {
        addDocumentTitle("Articles")
        handleArticleTable();

        return () => {
            dispatch(saveThought({ name: "", title: "" }));
            dispatch(networkErrorType({ net_type: null }))
            dispatch(articletable({ newState: [] , is_list_empty: false }));
        }
    }, [])


    return (
        <>
            <ArticleTableComponent
                articleTableProps={articleTableProps}
                saveThought={saveThought}
                dispatch={dispatch}
                loadingData={loadingData} 
                history={history}
                articleListLengthProps={articleListLengthProps}
               />
        </>
    )
}
export default Articles