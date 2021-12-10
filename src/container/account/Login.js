import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { login, loginData, loading, loginLoadingData } from '../../redux/account/loginReducer';
import { useHistory } from 'react-router';
import { addDocumentTitle, addValidation, clearCookies, getCookie, setCookie } from '../../functions';
import LoginComponent from '../../components/account/login';
import { handleLoginValidation } from '../../functions/validations';
import { authantication } from '../../redux/account/authReducer';
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loginProps = useSelector(loginData);
  const lognLoading = useSelector(loginLoadingData);
  const emailEl = useRef(null);
  const passwordEl = useRef(null);
  const emailElValidation = useRef(null);
  const passwordElValidation = useRef(null);
  const checkBoxElm = useRef(null);
  const { addToast } = useToasts();
  useEffect(() => {
    addDocumentTitle("Login")
    const email = getCookie("email");
    const password = getCookie("password");
    if (email && password) {
      checkBoxElm.current.checked = true;
      const signedInSession = { email, password };
      dispatch(login({ newState: { ...loginProps, ...signedInSession } }));
    }
    else {
      checkBoxElm.current.checked = false
    }
    emailEl.current.focus();

    return () => {
      dispatch(login({ newState: null }));
      dispatch(loading({ is_loading: false }));
    }
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault();
    let validation = {
      is_valid_email: { status: false, elm: emailEl, validation: emailElValidation },
      is_valid_password: { status: false, elm: passwordEl, validation: passwordElValidation }
    }
    validation = handleLoginValidation(validation, loginProps)
    let { is_valid_email, is_valid_password } = validation;
    addValidation(validation)
    if (is_valid_email.status && is_valid_password.status) {
      const keepMeLogIn = checkBoxElm.current.checked;
      dispatch(loading({ is_loading: true }));
      const bodyParameters = {
        email: loginProps.email,
        password: loginProps.password,
        device_type: "web",
      };
      axios.post("http://167.172.209.57/friendcrib/backend/api/login", bodyParameters)
        .then((response) => {
          dispatch(loading({ is_loading: false }));
          if (response.status == 200 && response.data.success) {
            if (keepMeLogIn) {
              setCookie("email", loginProps.email ,1);
              setCookie("password", loginProps.password ,1);
            }
            else {
              clearCookies()
            }
            setCookie("session_id", response.data.profile.session_id ,1);
            setCookie("profile", JSON.stringify(response.data.profile),1);
            dispatch(authantication({ is_auth: true }));
            history.push("/feed");
          }
          else {
            addToast(response.data.message, {
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

  const handleChange = (e) => {
    const target = e.target;
    dispatch(login({ newState: { ...loginProps, ...{ [target.name]: target.value } } }));
  }

  return (
    <LoginComponent
      allRefs={{ emailEl, passwordEl, emailElValidation, passwordElValidation, checkBoxElm }}
      loginProps={loginProps}
      lognLoading={lognLoading}
      handleChange={handleChange}
      handleSubmit={handleSubmit} />
  )
}
export default Login;