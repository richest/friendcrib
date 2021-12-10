import React from 'react';
import { Link } from 'react-router-dom';

const RegisterNowComponent = () => {
    return (
        <div className="col-md-5 dark-bg d-flex align-slef-center text-white">
            <div className="signup-box text-center align-self-center">
                <h2 className="h1 mb-3">Signup</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <Link href="javascript:void(0)" to="/register" className="btn transparent-btn w-100 mt-4">Register Now</Link>
            </div>
        </div>
    )
}
export default RegisterNowComponent;