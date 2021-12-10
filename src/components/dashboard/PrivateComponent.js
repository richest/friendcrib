import { Route, Redirect } from 'react-router-dom';
import { is_page_exist_app } from '../../functions';
import { Sidebar, Toolbar } from '../../components/dashboard/common';
import PrivateRoute from '../../routes/PrivateRoute';
import { SearchFriend, Albums, Articles, Books, Friends, Movies, Podcast, Profile, Restaurants, Songs, Feed, NewAddition, InviteFriend, AllNotification } from '../../container/dashboard';
import ThoughtsComponent from './common/Thoughts';


export const PrivateComponent = ({ isauth }) => {
    const is_page_exist = is_page_exist_app();
    if (is_page_exist || (!is_page_exist && isauth)) {
        return <section className="main-wrapper">
            <div className="container-fluid  p-0">
                <div className="row no-gutters">
                    <div className="col-md-12">
                        <Sidebar />
                        <div className="content-wrapper">
                            <Toolbar />
                            <Route>
                                {
                                    is_page_exist &&
                                    <>
                                        <PrivateRoute path="/feed" component={Feed} />
                                        <PrivateRoute path="/albums" component={Albums} />
                                        <PrivateRoute path="/articles" component={Articles} />
                                        <PrivateRoute path="/books" component={Books} />
                                        <PrivateRoute path="/friends" component={Friends} />
                                        <PrivateRoute path="/movies" component={Movies} />
                                        <PrivateRoute path="/podcasts" component={Podcast} />
                                        <PrivateRoute exact path="/profile" component={Profile} />
                                        <PrivateRoute path="/profile/:userName/:userId" component={Profile} />
                                        <PrivateRoute path="/restaurants" component={Restaurants} />
                                        <PrivateRoute path="/songs" component={Songs} />
                                        <PrivateRoute exact path="/new_addition/add" component={NewAddition} />
                                        <PrivateRoute path="/new_addition/:userId/edit/:typeId" component={NewAddition} />
                                        <PrivateRoute path="/search-friend" component={SearchFriend} />
                                        <PrivateRoute path="/all-notification" component={AllNotification} />
                                    </>
                                } 
                                {
                                    !is_page_exist &&
                                    <Redirect
                                        to="/feed"
                                    />
                                }
                                <ThoughtsComponent />
                                <InviteFriend />
                            </Route>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    }
    if (!is_page_exist && !isauth) {
        return <Route>
            <Redirect
                to="/login"
            />
        </Route>
    }
}