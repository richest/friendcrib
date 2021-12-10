import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RestaurantTableComponent } from '../../components/dashboard';
import { addDocumentTitle, clearCookies, getCookie } from '../../functions';
import { restauranttable, restaurantTableData, networkErrorType, networkErrordata, saveThought, loading, checkListLength,
    restaurdantLoadingData } from '../../redux/dashboard/RestaurantReducer';
import axios from 'axios';
import { useHistory } from 'react-router';
import { authantication } from '../../redux/account/authReducer';

const Restaurants = () => {
    const dispatch = useDispatch();
    const history= useHistory();
    const restaurdantTableProps = useSelector(restaurantTableData);
    const networkErrorProp = useSelector(networkErrordata);
    const loadingData = useSelector(restaurdantLoadingData);
    const restaurtantLengthProps = useSelector(checkListLength);

    const handleRestaurantTable = () => {
        dispatch(loading(true))
        const bodyParameters = {
            session_id: getCookie("session_id"),
            type_id: 4
        }
        axios.post("http://167.172.209.57/friendcrib/backend/api/getData", bodyParameters)
            .then((response) => {
                dispatch(loading(false))
                if (response.status == 200 && !response.error) {
                    dispatch(restauranttable({ newState: response.data.data, is_list_empty: response.data.data.length == 0 ? true : false }));
                    dispatch(networkErrorType({ net_type: { ...networkErrorProp, net_status: response.status } }))
                }
                else {
                    dispatch(restauranttable({ newState: [], is_list_empty: false }));
                }
            }, (error) => {
                if (error.toString().match("403")) {
                    dispatch(authantication({ is_auth: false }));
                    clearCookies();
                    history.push('/login');
                }
                dispatch(loading(false));
                dispatch(restauranttable({ newState: [], is_list_empty: false }));
            });
    }

    useEffect(() => {
        addDocumentTitle("Resturants");
        handleRestaurantTable();
        return () => {dispatch(saveThought({ name: "", title: "" }));
        dispatch(networkErrorType({ net_type: null }));
        dispatch(restauranttable({ newState: [],  is_list_empty: false }));}
    }, [])
    return (
        <>
            <RestaurantTableComponent
                restaurdantTableProps={restaurdantTableProps}
                saveThought={saveThought}
                loadingData={loadingData} 
                dispatch={dispatch}
                networkErrorProp={networkErrorProp}
                history={history}
                restaurtantLengthProps={restaurtantLengthProps}/>
        </>
    )
}
export default Restaurants;