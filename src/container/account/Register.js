import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import csc from 'country-state-city'
import RegisterComponent from '../../components/account/register';
import { addDocumentTitle, addValidation } from '../../functions';
import { handleRegisterValidation } from '../../functions/validations';
import {
    registerData, register, loading, registerLoadingData,
    countriesData, countries, citiesData, cities
} from '../../redux/account/registerReducer';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';

const Register = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const registerProps = useSelector(registerData);
    const registerLoading = useSelector(registerLoadingData);
    const countriesList = useSelector(countriesData);
    const citiesList = useSelector(citiesData);
    const usernameEl = useRef(null);
    const emailEl = useRef(null);
    const cityEl = useRef(null);
    const countryEl = useRef(null);
    const passwordEl = useRef(null);
    const confirmPasswordEl = useRef(null);
    const usernameElValidation = useRef(null);
    const emailElValidation = useRef(null);
    const countryElValidation = useRef(null);
    const cityElValidation = useRef(null);
    const passwordElValidation = useRef(null);
    const cofirmPasswordValidation = useState(null);
    const { addToast } = useToasts();

    useEffect(() => {
        addDocumentTitle("Register")
        dispatch(countries({ countries: csc.getAllCountries() }))
        usernameEl.current.focus();
        return() => {
          dispatch(register({ newState: null }));
          dispatch(countries({ countries: [] }));
          dispatch(cities({ cities: [] }))
          dispatch(loading({ is_loading: false }));
        }
    }, [])

    const handleChange = (e) => {
        const target = e.target;
        dispatch(register({ newState: { ...registerProps, ...{ [target.name]: target.value } } }));
    }

    useEffect(() => {
        dispatch(cities({ cities: [] }))
        dispatch(register({ newState: { ...registerProps, ...{ city: "" } } }));
        dispatch(cities({ cities: csc.getCitiesOfCountry(registerProps.country) }))
    }, [registerProps.country])

    const handleSubmit = (e) => {
        e.preventDefault();
        let validation = {
            is_valid_username: { status: false, elm: usernameEl, validation: usernameElValidation },
            is_valid_email: { status: false, elm: emailEl, validation: emailElValidation },
            is_valid_country: { status: false, elm: countryEl, validation: countryElValidation },
            is_valid_city: { status: false, elm: cityEl, validation: cityElValidation },
            is_valid_password: { status: false, elm: passwordEl, validation: passwordElValidation },
            is_valid_confirmPass: { status: false, elm: confirmPasswordEl, validation: cofirmPasswordValidation }
        }
        validation = handleRegisterValidation(validation, registerProps)
        let { is_valid_username, is_valid_email, is_valid_password, is_valid_confirmPass, is_valid_country,is_valid_city } = validation
        addValidation(validation)
        if (is_valid_username.status &&
            is_valid_email.status &&
            is_valid_password.status &&
            is_valid_confirmPass.status &&
            is_valid_country.status &&
            is_valid_city.status &&
            registerProps.password === registerProps.confirmPassword) {       
            dispatch(loading({ is_loading: true }));
            const bodyParameters = {
                username: registerProps.username,
                email:registerProps.email ,
                city: registerProps.city,
                country: registerProps.country,
                password: registerProps.password,
                password_confirmation: registerProps.confirmPassword,
                device_type:"web" ,
                };
                axios.post("http://167.172.209.57/friendcrib/backend/api/register" , bodyParameters )
                .then((response) => {
                  dispatch(loading({ is_loading: false }));
                  if (response.data.status == 200 && response.data.success) {
                    dispatch(register({ newState: null }));
                    addToast(response.data.message, {
                        appearance: 'success',
                        autoDismiss: true,
                      });
                      history.push("/login");
                  }
                  else {
                    addToast(response.data.message, {
                      appearance: 'error',
                      autoDismiss: true,
                    });
                  }
                  }, (error) =>{
                    addToast(error.message, {
                        appearance: 'error',
                        autoDismiss: true,
                      });
                    dispatch(loading({ is_loading: false }));
                  });
        }
    }

    return (
        <RegisterComponent
            allRefs={{
                usernameEl, emailEl, passwordEl, confirmPasswordEl,
                usernameElValidation, emailElValidation, passwordElValidation,
                cofirmPasswordValidation, countryEl, cityEl, countryEl,
                cityEl, countryElValidation, cityElValidation
            }}
            registerProps={registerProps}
            countriesList={countriesList}
            citiesList={citiesList}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            registerLoading={registerLoading}
          />
    )
}
export default Register;