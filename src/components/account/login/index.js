import React, { forwardRef } from 'react';
import { Input , Spinner} from '../../common';
import Logo from '../common/Logo';
import RegisterNowComponent from './RegisterNowComponent';

const LoginComponent = forwardRef((props) => {
    return (
        <section className="login py-3">
            <div className="container">
                <Logo />
                <div className="row justify-content-center">
                    <div className="col-md-5 white-bg">
                        <div className="login__box">
                            <form onSubmit={props.handleSubmit} noValidate={true} >
                                <h1 className="highlight-color">Login</h1>
                                <p className="login-descp mb-4">Sign In to your account</p>
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
                                            value={props.loginProps.email}
                                            onChange={props.handleChange}
                                            placeholder="Enter registered e-mail address" />
                                    </div>
                                   
                                        <p style={{display: "none"}} ref={props.allRefs.emailElValidation} className="error-message">Please enter registered e-mail address</p>
                                    
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
                                            value={props.loginProps.password}
                                            onChange={props.handleChange}
                                            placeholder="Enter password" />
                                    </div>
                                    
                                        <p style={{display: "none"}} ref={props.allRefs.passwordElValidation} className="error-message">Password must contain at least 8 characters, including upper/lowercase, number and special character</p>
                                    
                                </div>
                                <div className="login__box__fields mb-3 d-flex align-items-center justify-content-between">
                                    <span className="remember"><Input ref={props.allRefs.checkBoxElm} type="checkbox" name="remember" />Keep me signed in</span>
                                    <a className="remember highlight-color" href="javascript:void(0)">Forgot Password</a>
                                </div>
                                <div className="login__box__fields" style={{position: "relative"}}>
                                    <Input type="submit" disabled={props.lognLoading ? true : false} name={props.lognLoading ? "" : "submit"} value={props.lognLoading ? "" : "Submit"} class="form-control dark-bg text-white" />
                                    <Spinner loading={props.lognLoading} />
                                </div>
                            </form>
                        </div>
                    </div>
                    <RegisterNowComponent />
                </div>
            </div>
        </section>
    )
})
export default LoginComponent;