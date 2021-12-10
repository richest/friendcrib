import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Input, Select, Spinner } from '../../common';
import Logo from '../common/Logo';

const RegisterComponent = forwardRef((props) => {
    return (
        <section className="login register py-3 position-static">
            <div className="container">
                <Logo />
                <div className="row justify-content-center">
                    <div className="col-md-6 white-bg">
                        <div className="login__box">
                            <form onSubmit={props.handleSubmit} noValidate={true} autocomplete="off">
                                <h1 className="highlight-color">Register</h1>
                                <p className="login-descp mb-4">Create your
                                 account</p>
                                <div className="login__box__fields">
                                    <label>Name</label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><img src="/assets/images/user-icon.svg" alt="user" /></span>
                                        </div>
                                        <Input
                                            type="text"
                                            ref={props.allRefs.usernameEl}
                                            class="form-control"
                                            name="username"
                                            value={props.registerProps.username}
                                            onChange={props.handleChange}
                                            placeholder="Enter name"
                                        />
                                    </div>
                                    <p style={{ display: "none" }} ref={props.allRefs.usernameElValidation} className="error-message">Please enter name</p>
                                </div>
                                <div className="login__box__fields">
                                    <label>E-Mail Address</label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><img src="/assets/images/email.svg" alt="email" /></span>
                                        </div>
                                        <Input
                                            type="email"
                                            ref={props.allRefs.emailEl}
                                            class="form-control"
                                            name="email"
                                            value={props.registerProps.email}
                                            onChange={props.handleChange}
                                            placeholder="Enter registered e-mail address"
                                        />

                                    </div>
                                    <p style={{ display: "none" }} ref={props.allRefs.emailElValidation} className="error-message">Please enter registered e-mail address</p>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="login__box__fields">
                                            <label>Country</label>
                                            <div className="input-group mb-3">
                                                <Select
                                                    ref={props.allRefs.countryEl}
                                                    name="country"
                                                    onChange={props.handleChange}
                                                    value={props.registerProps.country}
                                                    class="w-100" >
                                                   
                                                    {
                                                        props.countriesList.map((country, index) => {
                                                            return <option  value={country.isoCode}>{country.name}</option>
                                                        })
                                                    }
                                                </Select>
                                            </div>
                                            <p style={{ display: "none" }} ref={props.allRefs.countryElValidation} className="error-message">Country is required</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="login__box__fields">
                                            <label>City and State</label>
                                            <div className="input-group mb-3">
                                                <Input
                                                   type="text"
                                                    ref={props.allRefs.cityEl}
                                                    name="city"
                                                    onChange={props.handleChange}
                                                    value={props.registerProps.city}
                                                    class="form-control" 
                                                    placeholder="Enter City and State"/>
                                                    {/* <option value="">Select City</option>
                                                    {
                                                        props.citiesList.map((city, index) => {
                                                            return <option value={city.name}>{city.name}</option>
                                                        })
                                                    } */}
                                         
                                            </div>
                                            <p style={{ display: "none" }} ref={props.allRefs.cityElValidation} className="error-message">City and State is required</p>
                                        </div>
                                    </div>

                                </div>
                                <div className="login__box__fields">
                                    <label>Password</label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><img src="/assets/images/password.svg" alt="password" /></span>
                                        </div>
                                        <Input
                                            type="password"
                                            ref={props.allRefs.passwordEl}
                                            class="form-control"
                                            name="password"
                                            value={props.registerProps.password}
                                            onChange={props.handleChange}
                                            placeholder="Enter Password"
                                        />
                                    </div>
                                    <p style={{ display: "none" }} ref={props.allRefs.passwordElValidation} className="error-message">Password must contain at least 8 characters, including upper/lowercase, number and special character</p>
                                </div>
                                <div className="login__box__fields">
                                    <label>Confirm Password</label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><img src="/assets/images/password.svg" alt="password" /></span>
                                        </div>
                                        <Input
                                            type="password"
                                            ref={props.allRefs.confirmPasswordEl}
                                            class="form-control"
                                            name="confirmPassword"
                                            value={props.registerProps.confirmPassword}
                                            onChange={props.handleChange}
                                            placeholder="Enter Confirm Password"
                                        />
                                    </div>
                                    <p style={{ display: "none" }} ref={props.allRefs.cofirmPasswordValidation} className="error-message">The passwords don't match. Please try again.</p>
                                </div>
                                <div className="login__box__fields" style={{ position: "relative" }}>
                                    <Input type="submit" disabled={props.registerLoading ? true : false} name="submit" value={props.registerLoading ? "" : "Submit"} class="form-control dark-bg text-white" />
                                    <Spinner loading={props.registerLoading} />
                                </div>
                            </form>
                            <p className="mt-3 text-center">Already have and account ? <Link href="javascript:void(0)" to="/login" className="highlight-color">Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
})
export default RegisterComponent;