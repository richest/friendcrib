import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/account/authReducer';
import loginReducer from './redux/account/loginReducer';
import registerReducer from './redux/account/registerReducer';
import newAdditionReducer from './redux/dashboard/newAdditionReducer';
import FriendReducer from './redux/dashboard/FriendReducer';
import movieReducer from './redux/dashboard/movieReducer';
import songReducer from './redux/dashboard/songsReducer';
import articleReducer from './redux/dashboard/articleReducer';
import bookReducer from './redux/dashboard/booksReducer';
import podcastReducer from './redux/dashboard/podcastReducer';
import RestaurantReducer from './redux/dashboard/RestaurantReducer';
import albumReducer from './redux/dashboard/albumReducer';
import FeedReducer from './redux/dashboard/FeedReducer';
import historyReducer from './redux/dashboard/historyReducer';
import searchFriendReducer from './redux/dashboard/searchFriendReducer';
import notificationReducer from './redux/dashboard/notificationReducer';
import profileReducer from './redux/dashboard/profileReducer';

export default configureStore({
    reducer: {
        auth: authReducer,
        login: loginReducer,
        register: registerReducer,
        newAddition: newAdditionReducer,
        friend: FriendReducer,
        movie: movieReducer,
        song: songReducer,
        article: articleReducer,
        book: bookReducer,
        podcast: podcastReducer,
        restaurant: RestaurantReducer,
        album: albumReducer,
        history: historyReducer,
        feed: FeedReducer,
        searchFriend : searchFriendReducer,
        notification : notificationReducer,
        profile: profileReducer
    }
});