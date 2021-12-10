import { replceMultiStringWithSIngle } from ".";

export const handleLoginValidation = (validation, loginProps) => {
    validation.is_valid_email.status = loginProps.email.match("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$") ? true : false;
    validation.is_valid_password.status = loginProps.password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})") ? true : false;
    return validation
}

export const handleRegisterValidation = (validation, registerProps) => {
    let username = replceMultiStringWithSIngle(registerProps.username);
    let City = replceMultiStringWithSIngle(registerProps.city);
    validation.is_valid_username.status = (username !== " " && username !== "") ? true : false;
    validation.is_valid_email.status = registerProps.email.match("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$") ? true : false;
    validation.is_valid_country.status = registerProps.country !== "" ? true : false;
    validation.is_valid_city.status = (City != "" && City != " " )? true : false;
    validation.is_valid_password.status = registerProps.password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})") ? true : false;
    validation.is_valid_confirmPass.status =   registerProps.password === registerProps.confirmPassword && registerProps.confirmPassword.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})") ? true : false;
    return validation
}

export const handleAdditionValidation = (validation, additionprops) => {
    let title = replceMultiStringWithSIngle(additionprops.title);
    let thoughts = replceMultiStringWithSIngle(additionprops.thoughts);
    let url = replceMultiStringWithSIngle(additionprops.url);
    validation.is_valid_title.status = (title !== " " && title !== "") ? true : false;
    validation.is_valid_url.status = url !==" " && url !== "" ? true : false;
    validation.is_valid_type.status = additionprops.type.value !== "" ? true : false;
    validation.is_valid_genre.status = additionprops.genre !== "" ? true : false;
    validation.is_valid_thoughts.status = thoughts !== "" && thoughts !== " " ? true : false;
    return validation
}

export const handleInviteFriendValidation = (validation, inviteFriendProps) => {
    validation.is_valid_email.status = inviteFriendProps.email.match("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$") ? true : false;
    return validation
}

