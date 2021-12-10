import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <div className="sidebar__logo white-bg d-flex align-items-center justify-content-center">
            <Link to="/feed" href="javascript:void(0)" className="mob-logo"><img src="/assets/images/logo-mob.svg" alt="logo" /></Link>
            <Link to="/feed" href="javascript:void(0)" className="desktop-logo"><img src="/assets/images/logo-main.svg" alt="logo" /></Link>
        </div>
    )
}
export default Logo;