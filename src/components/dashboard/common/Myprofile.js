import React from 'react';
import { Link } from 'react-router-dom';
import { getCookie } from '../../../functions';

const MyProfile = () => {
    let profileData = !!getCookie("profile") ? JSON.parse(getCookie("profile")) : null;
    return (
        <div className="profile text-center text-white py-4">
            <div className="profile__image mb-3">
                <img src="/assets/images/Avatar.jpeg" alt="user" />
            </div>
            <h6>{!!profileData ? profileData.username : ""}</h6>
            <Link to="/profile" href="javascript:void(0)" className="text-white">My Crib</Link>
        </div>
    )
}
export default MyProfile