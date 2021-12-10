const is_page_exist_app = (params) => {
    let is_page_exist = false;
    const pathname = window.location.pathname;
    switch (window.location.pathname) {
        case "/login":
            is_page_exist = true
        case "/register":
            is_page_exist = true
        case "/feed":
            is_page_exist = true
        case "/albums":
            is_page_exist = true
        case "/articles":
            is_page_exist = true
        case "/books":
            is_page_exist = true
        case "/friends":
            is_page_exist = true
        case "/movies":
            is_page_exist = true
        case "/podcasts":
            is_page_exist = true
        case (pathname.match("/profile") ? window.location.pathname : ""):
            is_page_exist = true
        case "/restaurants":
            is_page_exist = true
        case "/songs":
            is_page_exist = true
        case (pathname.match("/new_addition") ? window.location.pathname : ""):
            is_page_exist = true
        case "/search-friend":
            is_page_exist = true
        case "/all-notification":
            is_page_exist = true
    }
    return is_page_exist
}

const is_page_exist_private = () => {
    let is_page_exist = false;
    const pathname = window.location.pathname;
    switch (window.location.pathname) {
        case "/feed":
            is_page_exist = true
        case "/albums":
            is_page_exist = true
        case "/articles":
            is_page_exist = true
        case "/books":
            is_page_exist = true
        case "/friends":
            is_page_exist = true
        case "/movies":
            is_page_exist = true
        case "/podcasts":
            is_page_exist = true
        case (pathname.match("/profile") ? window.location.pathname : ""):
            is_page_exist = true
        case "/restaurants":
            is_page_exist = true
        case "/songs":
            is_page_exist = true
        case (pathname.match("/new_addition") ? window.location.pathname : ""):
            is_page_exist = true
        case "/search-friend":
            is_page_exist = true
        case "/all-notification":
            is_page_exist = true
    }
    return is_page_exist
}

const is_page_exist_protected = () => {
    let is_page_exist = false;
    switch (window.location.pathname) {
        case "/login":
            is_page_exist = true
        case "/register":
            is_page_exist = true
        case "/forgot-password":
            is_page_exist = true
        case "/reset-password":
            is_page_exist = true
    }
    return is_page_exist
}

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const setCookie =(name,value ,days )=> {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

const clearCookies = () => {
    document.cookie.split(";").forEach(function (c) { 
    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
}

const clearSingleCookie = (name) => {
    var d = new Date();
    d.setTime(d.getTime());
    var expires = "expires="+d.toUTCString();
    document.cookie = name + "=" + "" + ";domain="+window.location.hostname+";path=/;" + expires;
}

const addDocumentTitle = (title) => {
    document.title = "FriendCrib | " + title
}

const addValidation = (validation) => {
    for (var key of Object.keys(validation)) {
        if (!validation[key].status) {
            validation[key].elm.current.classList.add("validation-error");
            validation[key].validation.current.style.display = "block"
        }
        else {
            validation[key].elm.current.classList.remove("validation-error");
            validation[key].validation.current.style.display = "none"
        }
    }
}

const replceMultiStringWithSIngle = (string) => {
    string = string.trim().replace(/\s\s+/g, ' ');
    return string
}

const icon_type = (type) => {
    let image = "";
    switch (type) {
        case 1:
            image = "/assets/images/cinema-clapperboard.svg";
            break;
        case 2:
            image = "/assets/images/music_lg_icon.svg";
            break;
        case 3:
            image = "/assets/images/album-icon.svg";
            break;
        case 4:
            image = "/assets/images/food_icon.svg";
            break;
        case 5:
            image = "/assets/images/books-icon.svg";
            break;
        case 6:
            image = "/assets/images/Icon%20open-microphone.svg";
            break;
        case 7:
            image = "/assets/images/articles__icon.svg";
            break;
    }
    return image
}

const removeDublicateCribs = (cribList) => {
    cribList.forEach((data_outer, i) => {
        let count = 0;
        cribList.forEach((data_inner, j) => {
            if (data_inner.type == data_outer.type) {
                count += 1;
                if (count > 1) {
                    cribList.splice(j, 1)
                }
            }
        })
    })
    return cribList
}

export {
    is_page_exist_app, is_page_exist_private,
    is_page_exist_protected, getCookie, setCookie , addDocumentTitle,
    addValidation, replceMultiStringWithSIngle, clearCookies , icon_type, clearSingleCookie, removeDublicateCribs
}