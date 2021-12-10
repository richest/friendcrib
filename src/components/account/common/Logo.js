import React from 'react';
import { Link } from 'react-router-dom';
const Logo = () => {
    return (
        <div class="row">
            <div class="col-md-12 text-center">
                <Link to ="/login"href="javascript:void(0)"><img src="/assets/images/Logo.svg" alt="logo" /></Link>
            </div>
        </div>
    )
}

export default Logo