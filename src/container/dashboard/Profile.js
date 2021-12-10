import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { ProfileComponent } from '../../components/dashboard';
import { addDocumentTitle, getCookie } from '../../functions';
import { cribFavData, cribFavourite, loading, saveThought , profileListLength, setIsListEmpty } from "../../redux/dashboard/profileReducer";

const Profile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { userId, userName } = useParams();
    const newData = useSelector(cribFavData);
    const profileTableLength = useSelector(profileListLength);
    let latest_crib = [
        {
            type: 1,
            name: "Movies",
            display: "Movie",
            thoughts: "",
            title: "",
            edit: false,
            img: "/assets/images/movie_title_icon.svg"
        },
        {
            type: 2,
            name: "Songs",
            display: "Song",
            thoughts: "",
            title: "",
            edit: false,
            img: "/assets/images/songs_icon.svg"
        },
        {
            type: 3,
            name: "Albums",
            display: "Album",
            thoughts: "",
            title: "",
            edit: false,
            img: "/assets/images/album_icon.svg"
        },
        {
            type: 4,
            name: "Restaurants",
            display: "Restaurant",
            thoughts: "",
            title: "",
            edit: false,
            img: "/assets/images/restaurant_icon.svg"
        },
        {
            type: 5,
            name: "Books",
            display: "Book",
            thoughts: "",
            title: "",
            edit: false,
            img: "/assets/images/book_icon.svg"
        },
        {
            type: 6,
            name: "Podcasts",
            display: "Podcast",
            thoughts: "",
            title: "",
            edit: false,
            img: "/assets/images/podcast-color.svg"
        },
        {
            type: 7,
            name: "Articles",
            display: "Article",
            thoughts: "",
            title: "",
            edit: false,
            img: "/assets/images/article_icon.svg"
        },
    ];
    let latest_cribs = latest_crib

    const getFavCrib = () => {
        dispatch(loading(true))
        const bodyParameters = {
            session_id: getCookie("session_id")
        }
        axios.post("http://167.172.209.57/friendcrib/backend/api/getFavourite", bodyParameters)
            .then((response) => {
                dispatch(loading(false))
                if (response.data.status == 200 && response.data.success) {
                    let cribs = response.data.data;
                    let new_cribs = [];
                        cribs.forEach((item) => {
                            for (let j in latest_crib) {
                                if (latest_cribs[j].type == item.type_id) {
                                    new_cribs.push({
                                        id: item.id,
                                        display: latest_cribs[j].display,
                                        type: item.type_id,
                                        thoughts: item.thoughts,
                                        title: item.title,
                                        edit: true,
                                        img: latest_cribs[j].img,
                                        name: latest_cribs[j].name
                                    })
                                    latest_cribs.splice(j, 1);
                                }
                            }
                        })
                        dispatch(cribFavourite({ newState: [...new_cribs, ...latest_cribs] , is_list_empty: false }))    
                }
                else {
                    dispatch(setIsListEmpty(false))
                }
            }, (error) => {
                dispatch(setIsListEmpty(false))
                dispatch(loading(false))
            });
    }

    const getFavCribFrd = () => {
        dispatch(loading(true))
        const bodyParameters = {
            session_id: getCookie("session_id"),
            friend_id: userId
        }
        axios.post("http://167.172.209.57/friendcrib/backend/api/getListFriendsFavourite", bodyParameters)
            .then((response) => {
                dispatch(loading(false))
                if (response.data.status == 200 && response.data.success) {
                    let cribs = response.data.data;
                    let new_cribs = [];
                    if (cribs.length > 0) {
                        cribs.forEach((item) => {
                            for (let j in latest_crib) {
                                if (latest_cribs[j].type == item.type_id) {
                                    new_cribs.push({
                                        id: item.id,
                                        display: latest_cribs[j].display,
                                        type: item.type_id,
                                        thoughts: item.thoughts,
                                        title: item.title,
                                        edit: false,
                                        img: latest_cribs[j].img,
                                        name: latest_cribs[j].name
                                    })
                                }
                            }
                        })
                        dispatch(cribFavourite({ newState: new_cribs ,  is_list_empty: cribs.length == 0 ? true : false }))
                    }
                    else {
                        dispatch(cribFavourite({ newState: [] ,  is_list_empty: true }))
                    }
                }
                else {
                    dispatch(cribFavourite({ newState: [] ,  is_list_empty: false }))
                }
            }, (error) => {
                dispatch(loading(false))
                dispatch(cribFavourite({ newState: [] ,  is_list_empty: false }))
            });
    }


    const modifyCrib = (item) => {
        localStorage.setItem("addType", item.type)
        localStorage.setItem("addName", item.name)
        if (item.edit) {
            history.push("/new_addition/" + item.id + "/edit/" + item.type)
        }
        else {
            history.push("/new_addition/add")
        }
    }

    useEffect(() => {
        if (!!userId && !!userName) {
            addDocumentTitle(userName.charAt(0).toUpperCase() + userName.slice(1, userName.length) + "'s Crib")
            getFavCribFrd();
        }
        else {
            addDocumentTitle("My Crib");
            getFavCrib();
        }
        return () => {
            dispatch(saveThought({ name: "", title: "" }));
            dispatch(cribFavourite({ newState: [] }))
            dispatch(loading(false));
        }
    }, [])
    return (
        <ProfileComponent
            latest_cribs={newData}
            userId={userId}
            userName={userName}
            dispatch={dispatch}
            saveThought={saveThought}
            modifyCrib={modifyCrib} 
            profileTableLength={profileTableLength}
            />
    )
}
export default Profile;