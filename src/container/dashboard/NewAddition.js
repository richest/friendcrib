import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDocumentTitle, addValidation, getCookie } from '../../functions';
import { newAddition, loading, newadditionData, additionLoadingData, getFavourite, getFavouriteData, genreList, genreListData } from '../../redux/dashboard/newAdditionReducer';
import axios from 'axios';
import { handleAdditionValidation } from '../../functions/validations';
import { ConfirmModelComponent, NewAdditionComponent } from '../../components/dashboard';
import { useToasts } from 'react-toast-notifications';
import { useHistory, useLocation, useParams } from 'react-router';

const types = [
    { name: "Select type", value: "" },
    { name: "Movies", value: 1 },
    { name: "Songs", value: 2 },
    { name: "Albums", value: 3 },
    { name: "Restaurants", value: 4 },
    { name: "Books", value: 5 },
    { name: "Podcasts", value: 6 },
    { name: "Articles", value: 7 }
]

const NewAddition = () => {
    let { pathname } = useLocation();
    const { userId, typeId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const additionprops = useSelector(newadditionData);
    const newAddLoading = useSelector(additionLoadingData);
    const genreListprops = useSelector(genreListData);
    const myFavProps = useSelector(getFavouriteData);
    const titleEl = useRef(null);
    const urlEl = useRef(null);
    const typeEl = useRef(null);
    const genreEl = useRef(null);
    const thoughtsEl = useRef(null);
    const favoriteEl = useRef(null);
    const confirmEl = useRef(null);
    const titleElValidation = useRef(null);
    const urlElValidation = useRef(null);
    const typeElValidation = useRef(null);
    const genreElValidation = useRef(null);
    const thoughtsElValidation = useRef(null);
    const { addToast } = useToasts();
    const [genre_id, setGenreId] = useState("");
    const [fav, setFav] = useState(false);

    // useEffect(() => {
    //     if (pathname === "/new_addition/add") {
    //         setFav(false);
    //         dispatch(newAddition({ newState: { ...additionprops, ...{ genre: "", type: { name: "Movies", value: "1" } } } }));
    //         localStorage.removeItem("prevHistory");
    //         dispatch(newAddition({ newState: null }));
    //         dispatch(genreList({ genre_list: [] }));
    //         dispatch(loading({ is_loading: false }));
    //         dispatch(getFavourite({ message: "", check: false }));
    //         titleEl.current.focus();
    //     }
    // }, [pathname])


    const singleUserData = () => {
        dispatch(loading({is_loading: true}));
        const bodyParameters = {
            session_id: getCookie("session_id"),
            type_id: typeId,
            data_id: userId
        }
        axios.post(" http://167.172.209.57/friendcrib/backend/api/singleUserFetch", bodyParameters)
            .then((response) => {
                dispatch(loading({is_loading: false}));
                if (response.status == 200 && !response.error) {
                    response = response.data.data;
                    let addition = {
                        title: "",
                        url: "",
                        type: { value: "", name: "" },
                        genre: "",
                        thoughts: ""
                    }
                    let favourites = {
                        check: ""
                    }
                    if (response.length > 0) {
                        let type = "";
                        for (let i in types) {
                            if (Number(response[0].type_id) == types[i].value) {
                                type = types[i].name;
                                break;
                            }
                        }
                        addition.title = response[0].title;
                        addition.url = response[0].link;
                        addition.type.value = Number(response[0].type_id);
                        addition.type.name = type;
                        addition.thoughts = response[0].thoughts

                        favourites.check = response[0].favourite
                        setFav(response[0].favourite);
                        setGenreId(response[0].genre_id);
                    }
                    dispatch(newAddition({ newState: { ...additionprops, ...addition } }));
                    dispatch(getFavourite({ ...myFavProps, ...favourites }))
                }
            }, (error) => {
                dispatch(loading({is_loading: false}));
            });
    }
    const handleCheckadd = () => {
        dispatch(loading({is_loading: true}));
        const bodyParameters = {
            session_id: getCookie("session_id"),
            type_id: additionprops.type.value,
        }
        axios.post("http://167.172.209.57/friendcrib/backend/api/favouriteCheck", bodyParameters)
            .then((response) => {
                dispatch(loading({is_loading: false}));
                if (response.data.status == 200 && response.data.success) {
                    dispatch(getFavourite({ message: response.data.message, check: myFavProps.check }))
                    confirmEl.current.click();
                }
            }, (error) => {
                dispatch(loading({is_loading: false}));
            });
    }
    const handleCheckUpdate = () => {
        if (fav !== myFavProps.check) {
            dispatch(loading({is_loading: true}));
            const bodyParameters = {
                session_id: getCookie("session_id"),
                type_id: additionprops.type.value,
            }
            axios.post("http://167.172.209.57/friendcrib/backend/api/favouriteCheck", bodyParameters)
                .then((response) => {
                    dispatch(loading({is_loading: false}));
                    if (response.data.status == 200 && response.data.success) {
                        dispatch(getFavourite({ message: response.data.message, check: myFavProps.check }))
                        
                        if (!myFavProps.check && ((response.data.check && userId == response.data.crib_id) || !response.data.check)) {
                            localStorage.setItem("removeFavFromAll", "yes");
                        }
                        else {
                            localStorage.removeItem("removeFavFromAll")
                        }
                        confirmEl.current.click();
                    }
                }, (error) => {
                    dispatch(loading({is_loading: false}));
                });
        }
        else {
            dispatch(loading({is_loading: true}));
            const bodyParameters = {
                session_id: getCookie("session_id"),
                crib_id: Number(userId),
                title: additionprops.title,
                url: additionprops.url,
                type_id: additionprops.type.value,
                genre_id: Number(additionprops.genre),
                thoughts: additionprops.thoughts
            };

            axios.post("http://167.172.209.57/friendcrib/backend/api/cribupdate", bodyParameters)
                .then((response) => {
                    dispatch(loading({ is_loading: false }));
                    if (response.status == 200 && !response.error) {
                        addToast(response.data.message, {
                            appearance: 'success',
                            autoDismiss: true,
                        });
                        for (let i in types) {
                            if (bodyParameters.type_id == types[i].value) {
                                let is_prevHistory = !!localStorage.getItem("prevHistory") ? (localStorage.getItem("prevHistory") == "yes" ? "yes" : "") : "";
                                if (!!is_prevHistory) {
                                    history.push("/feed");
                                    document.getElementById("pills-profile-tab").click()
                                }
                                else {
                                    let is_addType = !!localStorage.getItem("addType") ? localStorage.getItem("addType") : "";
                                    let is_addName = !!localStorage.getItem("addName") ? localStorage.getItem("addName") : "";

                                    if (!!is_addType && !!is_addName) {
                                        history.push("/profile")
                                    }
                                    else {
                                        history.push("/" + types[i].name.toLocaleLowerCase())
                                    }
                                }
                                break;
                            }
                        }
                        dispatch(newAddition({ newState: null }));
                    }
                    else {
                        addToast(response.message, {
                            appearance: 'error',
                            autoDismiss: true,
                        });
                    }
                }, (error) => {
                    dispatch(loading({ is_loading: false }));
                    addToast(error.message, {
                        appearance: 'error',
                        autoDismiss: true,
                    });
                });
        }
    }
    const makefavourite = (cribId) => {
        dispatch(loading({is_loading: true}));
        const bodyParameters = {
            session_id: getCookie("session_id"),
            type_id: additionprops.type.value,
            crib_id: cribId,
            delete: !!localStorage.getItem("removeFavFromAll") ? (localStorage.getItem("removeFavFromAll") == "yes" ? "true" : "false") : "false"
        }
        axios.post("http://167.172.209.57/friendcrib/backend/api/favourite", bodyParameters)
            .then((response) => {
                dispatch(loading({is_loading: false}));
                if (response.status == 200 && !response.error) {
                }
                else {

                }
            }, (error) => {
                dispatch(loading({is_loading: false}));
            });
    }
    const handleConfirmSumbit = () => {
        dispatch(loading({ is_loading: true }));
        if (userId) {
            const bodyParameters = {
                session_id: getCookie("session_id"),
                crib_id: Number(userId),
                title: additionprops.title,
                url: additionprops.url,
                type_id: additionprops.type.value,
                genre_id: Number(additionprops.genre),
                thoughts: additionprops.thoughts
            };

            axios.post("http://167.172.209.57/friendcrib/backend/api/cribupdate", bodyParameters)
                .then((response) => {
                    dispatch(loading({ is_loading: false }));
                    if (response.status == 200 && !response.error) {
                        makefavourite(Number(userId))
                        addToast(response.data.message, {
                            appearance: 'success',
                            autoDismiss: true,
                        });
                        dispatch(newAddition({ newState: null }));
                        for (let i in types) {
                            if (additionprops.type.value == types[i].value) {
                                let is_prevHistory = !!localStorage.getItem("prevHistory") ? (localStorage.getItem("prevHistory") == "yes" ? "yes" : "") : "";
                                if (!!is_prevHistory) {
                                    history.push("/feed");
                                    document.getElementById("pills-profile-tab").click()
                                }
                                else {
                                    let is_addType = !!localStorage.getItem("addType") ? localStorage.getItem("addType") : "";
                                    let is_addName = !!localStorage.getItem("addName") ? localStorage.getItem("addName") : "";

                                    if (!!is_addType && !!is_addName) {
                                        history.push("/profile")
                                    }
                                    else {
                                        history.push("/" + types[i].name.toLocaleLowerCase())
                                    }
                                }
                                break;
                            }
                        }
                    }
                    else {
                        addToast(response.message, {
                            appearance: 'error',
                            autoDismiss: true,
                        });
                    }
                }, (error) => {
                    dispatch(loading({ is_loading: false }));
                    addToast(error.message, {
                        appearance: 'error',
                        autoDismiss: true,
                    });
                });
        }
        else {
            dispatch(loading({is_loading: true}));
            const bodyParameters = {
                session_id: getCookie("session_id"),
                type_id: additionprops.type.value,
                title: additionprops.title,
                url: additionprops.url,
                genre_id: additionprops.genre,
                thoughts: additionprops.thoughts
            };
            axios.post("http://167.172.209.57/friendcrib/backend/api/crib", bodyParameters)
                .then((response) => {
                    dispatch(loading({ is_loading: false }));
                    if (response.status == 200 && !response.error) {
                        makefavourite(response.data.data.id);

                        for (let i in types) {
                            if (bodyParameters.type_id == types[i].value) {
                                let is_addType = !!localStorage.getItem("addType") ? localStorage.getItem("addType") : "";
                                let is_addName = !!localStorage.getItem("addName") ? localStorage.getItem("addName") : "";

                                if (!!is_addType && !!is_addName) {
                                    history.push("/profile")
                                }
                                else {
                                    history.push("/" + types[i].name.toLocaleLowerCase())
                                }
                                break;
                            }
                        }
                        dispatch(newAddition({ newState: null }));
                        addToast(response.data.message, {
                            appearance: 'success',
                            autoDismiss: true,
                        });
                    }
                    else {
                        addToast(response.message, {
                            appearance: 'error',
                            autoDismiss: true,
                        });
                    }
                }, (error) => {
                    dispatch(loading({ is_loading: false }));
                    addToast(error.message, {
                        appearance: 'error',
                        autoDismiss: true,
                    });
                });
        }

    }

    const handleCancel = () => {
        dispatch(loading({ is_loading: true }));
        if (userId) {
            const bodyParameters = {
                session_id: getCookie("session_id"),
                crib_id: Number(userId),
                title: additionprops.title,
                url: additionprops.url,
                type_id: additionprops.type.value,
                genre_id: Number(additionprops.genre),
                thoughts: additionprops.thoughts
            };

            axios.post("http://167.172.209.57/friendcrib/backend/api/cribupdate", bodyParameters)
                .then((response) => {
                    dispatch(loading({ is_loading: false }));
                    if (response.status == 200 && !response.error) {
                        addToast(response.data.message, {
                            appearance: 'success',
                            autoDismiss: true,
                        });
                        dispatch(newAddition({ newState: null }));
                        for (let i in types) {
                            if (additionprops.type.value == types[i].value) {
                                let is_prevHistory = !!localStorage.getItem("prevHistory") ? (localStorage.getItem("prevHistory") == "yes" ? "yes" : "") : "";
                                if (!!is_prevHistory) {
                                    history.push("/feed");
                                    document.getElementById("pills-profile-tab").click()
                                }
                                else {
                                    let is_addType = !!localStorage.getItem("addType") ? localStorage.getItem("addType") : "";
                                    let is_addName = !!localStorage.getItem("addName") ? localStorage.getItem("addName") : "";

                                    if (!!is_addType && !!is_addName) {
                                        history.push("/profile")
                                    }
                                    else {
                                        history.push("/" + types[i].name.toLocaleLowerCase())
                                    }
                                }
                                break;
                            }
                        }
                    }
                    else {
                        addToast(response.message, {
                            appearance: 'error',
                            autoDismiss: true,
                        });
                    }
                }, (error) => {
                    dispatch(loading({ is_loading: false }));
                    addToast(error.message, {
                        appearance: 'error',
                        autoDismiss: true,
                    });
                });
        }
        else {
            dispatch(loading({is_loading: true}));
            const bodyParameters = {
                session_id: getCookie("session_id"),
                type_id: additionprops.type.value,
                title: additionprops.title,
                url: additionprops.url,
                genre_id: additionprops.genre,
                thoughts: additionprops.thoughts
            };
            axios.post("http://167.172.209.57/friendcrib/backend/api/crib", bodyParameters)
                .then((response) => {
                    dispatch(loading({ is_loading: false }));
                    if (response.status == 200 && !response.error) {
                       
                        for (let i in types) {
                            if (bodyParameters.type_id == types[i].value) {
                                let is_addType = !!localStorage.getItem("addType") ? localStorage.getItem("addType") : "";
                                    let is_addName = !!localStorage.getItem("addName") ? localStorage.getItem("addName") : "";

                                    if (!!is_addType && !!is_addName) {
                                        history.push("/profile")
                                    }
                                    else {
                                        history.push("/" + types[i].name.toLocaleLowerCase())
                                    }
                                break;
                            }
                        }
                        dispatch(newAddition({ newState: null }));
                        addToast(response.data.message, {
                            appearance: 'success',
                            autoDismiss: true,
                        });
                    }
                    else {
                        addToast(response.message, {
                            appearance: 'error',
                            autoDismiss: true,
                        });
                    }
                }, (error) => {
                    dispatch(loading({ is_loading: false }));
                    addToast(error.message, {
                        appearance: 'error',
                        autoDismiss: true,
                    });
                });
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let validation = {
            is_valid_title: { status: false, elm: titleEl, validation: titleElValidation },
            is_valid_url: { status: false, elm: urlEl, validation: urlElValidation },
            is_valid_type: { status: false, elm: typeEl, validation: typeElValidation },
            is_valid_genre: { status: false, elm: genreEl, validation: genreElValidation },
            is_valid_thoughts: { status: false, elm: thoughtsEl, validation: thoughtsElValidation },
        }
        validation = handleAdditionValidation(validation, additionprops);
        let { is_valid_title, is_valid_url, is_valid_type, is_valid_genre, is_valid_thoughts } = validation
        addValidation(validation);
        if (is_valid_title.status && is_valid_url.status && is_valid_type.status && is_valid_genre.status && is_valid_thoughts.status) {
            if (userId) {
                handleCheckUpdate();
            }
            else {
                if (myFavProps.check) {
                    handleCheckadd();
                }
                else {
                    dispatch(loading({ is_loading: true }));
                    const bodyParameters = {
                        session_id: getCookie("session_id"),
                        type_id: additionprops.type.value,
                        title: additionprops.title,
                        url: additionprops.url,
                        genre_id: additionprops.genre,
                        thoughts: additionprops.thoughts
                    };
                    axios.post("http://167.172.209.57/friendcrib/backend/api/crib", bodyParameters)
                        .then((response) => {
                            dispatch(loading({ is_loading: false }));
                            if (response.status == 200 && !response.error) {
                                for (let i in types) {
                                    if (bodyParameters.type_id == types[i].value) {
                                        let is_addType = !!localStorage.getItem("addType") ? localStorage.getItem("addType") : "";
                                        let is_addName = !!localStorage.getItem("addName") ? localStorage.getItem("addName") : "";
    
                                        if (!!is_addType && !!is_addName) {
                                            history.push("/profile")
                                        }
                                        else {
                                            history.push("/" + types[i].name.toLocaleLowerCase())
                                        }
                                        break;
                                    }
                                }
                                dispatch(newAddition({ newState: null }));
                                addToast(response.data.message, {
                                    appearance: 'success',
                                    autoDismiss: true,
                                });
                            }
                            else {
                                addToast(response.message, {
                                    appearance: 'error',
                                    autoDismiss: true,
                                });
                            }
                        }, (error) => {
                            dispatch(loading({ is_loading: false }));
                            addToast(error.message, {
                                appearance: 'error',
                                autoDismiss: true,
                            });
                        });
                }
            }
        }

    }
    useEffect(() => {
        setFav(false);
        addDocumentTitle(userId ? "Addition | Update" : "Addition | Add");
        if (userId) {
            dispatch(getFavourite({ message: "", check: false }))
            singleUserData();
        }
        else {
            let is_addType = !!localStorage.getItem("addType") ? localStorage.getItem("addType") : "";
            let is_addName = !!localStorage.getItem("addName") ? localStorage.getItem("addName") : "";
            if (is_addType && is_addName) {
                dispatch(getFavourite({ message: "", check: true }))
            }
            else {
                dispatch(getFavourite({ message: "", check: false }))
            }
            let new_type = (is_addType && is_addName) ? { name: is_addName, value: is_addType } : { name: "Movies", value: "1" };
          
            dispatch(newAddition({ newState: { ...additionprops, ...{ genre: "", type: new_type } } }));
        }
        titleEl.current.focus();
        return () => {
            localStorage.removeItem("prevHistory");
            localStorage.removeItem("addType");
            localStorage.removeItem("addName");
            dispatch(newAddition({ newState: null }));
            dispatch(genreList({ genre_list: [] }));
            dispatch(loading({ is_loading: false }));
            dispatch(getFavourite({ message: "", check: false }))
        }
    }, [])

    const handleGenreList = () => {
        dispatch(loading({is_loading: true}));
        const bodyParameters = {
            session_id: getCookie("session_id"),
            type_id: additionprops.type.value

        };
        axios.post("http://167.172.209.57/friendcrib/backend/api/genreList", bodyParameters)
            .then((response) => {
                dispatch(loading({is_loading: false}));
                if (response.status == 200 && !response.error) {
                    dispatch(genreList({ genre_list: response.data.data }));
                    if (!!userId) {
                        const addition = { genre: genre_id.toString() }
                        dispatch(newAddition({ newState: { ...additionprops, ...addition } }));
                    }
                }
            }, (error) => {
                dispatch(loading({is_loading: false}));
            });
    }

    useEffect(() => {
        if (!!additionprops.type.value) {
            dispatch(genreList({ genre_list: [] }));
            dispatch(newAddition({ newState: { ...additionprops, ...{ genre: "" } } }));
            handleGenreList();
            // dispatch(getFavourite({ ...myFavProps, check: false }))
        }
    }, [additionprops.type.value])

    const handleChange = (e) => {
        const target = e.target;
        let type = "";
        if (target.name === "type") {
            for (let i in types) {
                if (target.value == types[i].value) {
                    type = types[i].name;
                    break;
                }
            }
        }
        if (target.name !== "favorite") {
            dispatch(newAddition({ newState: { ...additionprops, ...{ [target.name]: target.name === "type" ? { name: type, value: target.value } : target.value } } }))
        }
        else {
            dispatch(getFavourite({ ...myFavProps, ...{ check: target.checked } }))
        }
    }

    return (
        <>
            <NewAdditionComponent
                allref={{
                    titleEl, urlEl, typeEl, genreEl, thoughtsEl, titleElValidation, urlElValidation, typeElValidation, genreElValidation,
                    thoughtsElValidation, favoriteEl, confirmEl
                }}
                additionprops={additionprops}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                genreListprops={genreListprops}
                newAddLoading={newAddLoading}
                myFavProps={myFavProps}
                userId={userId}
            />
            <ConfirmModelComponent
                handleCancel={handleCancel}
                handleConfirmSumbit={handleConfirmSumbit}
                myFavProps={myFavProps} />
        </>
    )
}
export default NewAddition;