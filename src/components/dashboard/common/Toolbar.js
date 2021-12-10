import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { clearSingleCookie, getCookie, replceMultiStringWithSIngle } from '../../../functions';
import { authantication } from '../../../redux/account/authReducer';
import { searchfriendName, searchFriendTable, loading } from '../../../redux/dashboard/searchFriendReducer';
import { Input } from '../../common';
import { allNotificationTable, onScreenNotification, onScreenNotidata, totalNotiCountData, totalNotificationCount } from '../../../redux/dashboard/notificationReducer';
import { friendTable } from '../../../redux/dashboard/FriendReducer';
import $ from "jquery";
import { toggleLoadingData } from '../../../redux/dashboard/FeedReducer';

const Toolbar = (props) => {
    let { pathname } = useLocation();
    const dispatch = useDispatch();
    const searchNameEl = useRef(null);
    const history = useHistory();
    const toggleLoading = useSelector(toggleLoadingData)
    let profileData = !!getCookie("profile") ? JSON.parse(getCookie("profile")) : null;
    const onSreenNotificationProp = useSelector(onScreenNotidata);
    const totalNotiCountProp = useSelector(totalNotiCountData);

    useEffect(() => {
        handleOnScrenNotification();
    }, [pathname])

    useEffect(() => {
        //  $('.notifications').on('click', function() {
        //     e.stopPropagation();
        //     $(".notifications__box").addClass('show');
        //   });
        //   $('body').on('click',  function(e) {

        //     $('.notifications__box').removeClass('show');
        //   });
        $(".notifications").on("click", function (event) {
            $(".notifications__box").toggleClass("show");

        });
    }, [])
    const handleFriendList = () => {
        const bodyParameters = {
            session_id: getCookie("session_id"),
        }
        axios.post("http://167.172.209.57/friendcrib/backend/api/friendlist", bodyParameters)
            .then((response) => {
                if (response.status == 200 && !response.error) {
                    dispatch(friendTable({ newState: response.data.data }))
                }
                else {
                    dispatch(friendTable({ newState: [] }))
                }
            }, (error) => {
                dispatch(friendTable({ newState: [] }))
            });
    }

    const handleAcceptRequest = (Id) => {
        const bodyParameters = {
            session_id: getCookie("session_id"),
            Notifications_id: Id
        }
        axios.post("http://167.172.209.57/friendcrib/backend/api/requestAccept", bodyParameters)
            .then((response) => {
                if (response.status == 200 && !response.error) {
                    handleOnScrenNotification();
                    if (pathname == "/friends") {
                        handleFriendList();
                    }
                }
                else {

                }
            }, (error) => {

            });
    }
    const handleDeclineRequest = (Id) => {
        const bodyParameters = {
            session_id: getCookie("session_id"),
            Notifications_id: Id
        }
        axios.post("http://167.172.209.57/friendcrib/backend/api/requestDecline", bodyParameters)
            .then((response) => {
                if (response.status == 200 && !response.error) {
                    handleOnScrenNotification();
                }
                else {

                }
            }, (error) => {
                dispatch(onScreenNotification({ newState: [] }))
            });
    }

    const handleOnScrenNotification = () => {
        const bodyParameters = {
            session_id: getCookie("session_id")
        }
        axios.post("http://167.172.209.57/friendcrib/backend/api/getOnScreenNotification", bodyParameters)
            .then((response) => {
                if (response.data.status == 200 && response.data.success) {
                    dispatch(onScreenNotification({ newState: response.data.data }));
                    dispatch(totalNotificationCount(response.data.notification_count))
                }
                else {
                    dispatch(onScreenNotification({ newState: [] }))
                    if (response.status == 403) {
                        dispatch(authantication({ is_auth: false }));
                        clearSingleCookie('profile');
                        clearSingleCookie('session_id')
                    }
                }
            }, (error) => {
                if (error.toString().match("403")) {
                    dispatch(authantication({ is_auth: false }));
                    clearSingleCookie('profile');
                    clearSingleCookie('session_id')
                }
                dispatch(onScreenNotification({ newState: [] }))
            });
    }

    const clearLogoutSession = () => {
        const bodyParameters = {
            session_id: getCookie("session_id")
        }
        axios.post("http://167.172.209.57/friendcrib/backend/api/logout", bodyParameters)
            .then((respose) => {
                dispatch(authantication({ is_auth: false }));
                clearSingleCookie('profile');
                clearSingleCookie('session_id')
            }, (error) => {

            })
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        dispatch(searchfriendName(searchNameEl.current.value));
        if (pathname !== "/search-friend") {
            const search = replceMultiStringWithSIngle(searchNameEl.current.value)
            if (!!search && search !== " ") {
            history.push("/search-friend")
            }
        }
        else {
            // api
            const search = replceMultiStringWithSIngle(searchNameEl.current.value)
            if (!!search && search !== " ") {
                dispatch(loading(true));
                const bodyParameters = {
                    session_id: getCookie("session_id"),
                    search
                }
                axios.post("http://167.172.209.57/friendcrib/backend/api/searchfriend", bodyParameters)
                    .then((response) => {
                        dispatch(loading(false));
                        if (response.status == 200 && response.data.success) {
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
    }
    const handleMarkAsRead = () => {
        const bodyParameters = {
            session_id: getCookie("session_id"),
        }
        axios.post("http://167.172.209.57/friendcrib/backend/api/markAllRead", bodyParameters)
            .then((response) => {
                if (response.status == 200 && !response.error) {

                }
                else {

                }
            }, (error) => {

            });
    }
    const handleAllNotification = () => {
        dispatch(loading(true));
        const bodyParameters = {
            session_id: getCookie("session_id"),
        }
        axios.post("http://167.172.209.57/friendcrib/backend/api/getAllNotification", bodyParameters)
            .then((response) => {
                dispatch(loading(false));
                if (response.status == 200 && !response.error) {
                    dispatch(allNotificationTable({ newState: response.data.data }));
                }
                else {
                    dispatch(allNotificationTable({ newState: [] }));
                }
            }, (error) => {
                dispatch(allNotificationTable({ newState: [] }));
                dispatch(loading(false));
            });
    }
    const goToNotifications = () => {
        history.push("/all-notification");
        if (pathname = "/all-notification") { // same page as all-notifications
            // handleAllNotification();
            // handleMarkAsRead();
            handleOnScrenNotification()
        }
    }

    return (
        <div className="topbar white-bg d-flex align-items-center position-fixed">
            {
                <div className="toggle-menu">
                    {
                        !toggleLoading &&
                        <span />
                    }
                </div>
            }
            <div className="additions-adds">
                {
                    !pathname.match("/new_addition/") &&
                    <Link to="/new_addition/add" href="javascript:void(0)" className="highlight-color">
                        <span className="icon"><img src="/assets/images/plus.svg" alt="add addition" /></span>Add Item</Link>
                }
            </div>


            <div className="topbar__search mx-auto">
                <form onSubmit={handleSearchSubmit} noValidate={true} autocomplete="off">
                    <Input
                        type="text"
                        ref={searchNameEl}
                        class="form-control"
                        name="search"
                        placeholder="Find a friend"
                    />
                    <img src="/assets/images/magnifying-glass.svg" alt="search" onClick={handleSearchSubmit} />
                    <Input type="submit" name="submit" value="Submit" id="search-submit" />
                    {/* <input type="submit" name="submit" id="search-submit" /> */}
                </form>

            </div>

            <div className="topbar__right ml-auto d-flex">
                <div className="notifications">
                    <div className="notifications__icon position-relative cursor-pointer">
                        {onSreenNotificationProp.length > 0 ? <span className="notifications__counter"></span> : ""}
                        <img src="/assets/images/notification-bell.svg" alt="notification" onClick={handleOnScrenNotification} className="notification-bell" />
                    </div>
                    <div class="notifications__box">
                        {onSreenNotificationProp.map((data, index) => (
                            <div class="notification__listing">
                                <div class="notification__listing__item">
                                    <span>{data.user_data.Message}</span>
                                </div>
                                {data.type_id === 0 ?
                                    <div className="notification__action">
                                        <a href="javascript:void(0)" onClick={() => handleAcceptRequest(data.notifications_id)} className="accepted"><img src="/assets/images/accepted.svg" alt="accepted" /></a>
                                        <a href="javascript:void(0)" onClick={() => handleDeclineRequest(data.notifications_id)} className="rejected"><img src="/assets/images/rejected.svg" alt="rejected" /></a>
                                    </div>
                                    : ""}
                            </div>
                        ))}
                        {totalNotiCountProp > 0 &&
                            <div class="notification__listing">
                                <div class="notification__listing__item">
                                    <span><a href="javascript:void(0)" onClick={goToNotifications} className="txt-main-color link-hover">See All</a></span>
                                </div>
                            </div>}
                    </div>
                </div>
                <div className="logged-user  d-flex align-items-center">
                    <img src="/assets/images/Avatar.jpeg" alt="user" />
                    <div className="logged-user__name"><span>{!!profileData ? profileData.username : ""}</span> <img src="/assets/images/small-down.svg" alt="arrow" /></div>
                    <div className="profile-dropdown">
                        <ul className="list-unstyled">
                            <li><Link to="/profile" href="my-profile.html">My Crib</Link></li>
                            <li><a href="javascript:void(0)" onClick={clearLogoutSession}>Logout</a></li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Toolbar;