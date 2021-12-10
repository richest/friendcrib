import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { inviteFriend, loading } from '../../../redux/dashboard/FriendReducer';
import Logo from './Logo';
import MyProfile from './Myprofile';

// https://www.npmjs.com/package/react-custom-scrollbars

const Sidebar = () => {
    const dispatch = useDispatch();
    const inviteUser = () => {
        dispatch(loading({ is_loading: false }))
        dispatch(inviteFriend({ newState: null }));
        const inviteInputVal = document.getElementById("invite-input-val");  
        window.setTimeout(() => {
            inviteInputVal.focus()
        }, 250)
        inviteInputVal.classList.remove("validation-error")
        document.getElementById("invite-error").style.display = "none"
    }
    return (
        <div className="sidebar dark-bg">
            <Logo />
            <MyProfile />
            <Scrollbars autoHide className="sidebar__menu-scroll">
                <div className="sidebar__menu">
                    <ul>
                        <li>
                           <Link  href="javascript:void(0)" onClick={inviteUser} data-toggle="modal" data-target="#invite-modal"><img src="/assets/images/mega-phone.svg" alt="Spread the word" /><span class="sidebar__menu__items">Spread the word!</span></Link>
                        </li>
                        <li>
                            <Link to="/feed" href="javascript:void(0)"><img src="/assets/images/icon_home.svg" alt="home" /><span className="sidebar__menu__items">Home</span></Link>
                        </li>
                        <li>
                            <Link to="/friends" href="javascript:void(0)"><img src="/assets/images/user_icon_white.svg" alt="Friends" /><span className="sidebar__menu__items">Friends</span></Link></li>
                        <li>
                            <Link to="/movies" href="javascript:void(0)"><img src="/assets/images/movies_icon.svg" alt="Movies" /><span className="sidebar__menu__items">Movies</span></Link></li>
                        <li>
                            <Link to="/songs" href="javascript:void(0)"><img src="/assets/images/music-icon.svg" alt="Songs" /><span className="sidebar__menu__items">Songs</span></Link></li>
                        <li>
                            <Link to="/albums" href="javascript:void(0)"><img src="/assets/images/album-icon.svg" alt="Albums" /><span className="sidebar__menu__items">Albums</span></Link></li>
                        <li>
                            <Link to="/restaurants" href="javascript:void(0)"><img src="/assets/images/restaurants-icon.svg" alt="Restaurants" /><span className="sidebar__menu__items">Restaurants</span></Link></li>
                        <li>
                            <Link to="/books" href="javascript:void(0)"><img src="/assets/images/books-icon.svg" alt="Books" /><span className="sidebar__menu__items">Books</span></Link></li>
                        <li>
                            <Link to="/podcasts" href="javascript:void(0)"><img src="/assets/images/podcast__icon.svg" alt="Podcasts" /><span className="sidebar__menu__items">Podcasts</span></Link></li>
                        <li>
                            <Link to="/articles" href="javascript:void(0)"><img src="/assets/images/articles__icon.svg" alt="Articles" /><span className="sidebar__menu__items">Articles</span></Link></li>
                    </ul>
                </div>
            </Scrollbars>
        </div>
    )
}
export default Sidebar;