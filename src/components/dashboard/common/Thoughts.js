import React from 'react';
import { useSelector } from 'react-redux';
import { thoughtData as albumsThought } from '../../../redux/dashboard/albumReducer';
import { thoughtData as articleThought } from '../../../redux/dashboard/articleReducer';
import { thoughtData as booksThought } from '../../../redux/dashboard/booksReducer';
import { thoughtData as feedThought } from '../../../redux/dashboard/FeedReducer';
import { thoughtData as moviesThought } from '../../../redux/dashboard/movieReducer';
import { thoughtData as podcastThought } from '../../../redux/dashboard/podcastReducer';
import { thoughtData as resturantsThought } from '../../../redux/dashboard/RestaurantReducer';
import { thoughtData as songsThought } from '../../../redux/dashboard/songsReducer';
import { thoughtData as profileThought } from '../../../redux/dashboard/profileReducer';

const ThoughtsComponent = () => {
    const albumsThoughtProps = useSelector(albumsThought);
    const articleThoughtProps = useSelector(articleThought);
    const bookThoughtProps = useSelector(booksThought);
    const feedThoughtProps = useSelector(feedThought);
    const movieThoughtProps = useSelector(moviesThought);
    const podcastThoughtProps = useSelector(podcastThought);
    const restaurantThoughtProps = useSelector(resturantsThought);
    const songsThoughtProps = useSelector(songsThought);
    const profileThoughtProps = useSelector(profileThought);
 
    return (
        <div className="modal fade" id="thought-modal">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    {/* Modal Header */}
                    <div className="modal-header border-0 p-0">
                        <h2 className="modal-title">
                            {!!albumsThoughtProps.title && albumsThoughtProps.title}
                            {!!articleThoughtProps.title && articleThoughtProps.title}
                            {!!bookThoughtProps.title && bookThoughtProps.title}
                            {!!feedThoughtProps.title && feedThoughtProps.title}
                            {!!movieThoughtProps.title && movieThoughtProps.title}
                            {!!podcastThoughtProps.title && podcastThoughtProps.title}
                            {!!restaurantThoughtProps.title && restaurantThoughtProps.title}
                            {!!songsThoughtProps.title && songsThoughtProps.title}
                            {!!profileThoughtProps.title && profileThoughtProps.title}
                        </h2>

                        <button type="button" className="close" data-dismiss="modal"><img src="/assets/images/close-btn.png" alt="close" /></button>
                    </div>
                    {/* Modal body */}
                    <div className="modal-body p-0">
                        <h5 className="highlight-color my-3">Thoughts</h5>
                        <div className="thought-descp">
                            <p>
                                {!!albumsThoughtProps.name && albumsThoughtProps.name}
                                {!!articleThoughtProps.name && articleThoughtProps.name}
                                {!!bookThoughtProps.name && bookThoughtProps.name}
                                {!!feedThoughtProps.name && feedThoughtProps.name}
                                {!!movieThoughtProps.name && movieThoughtProps.name}
                                {!!podcastThoughtProps.name && podcastThoughtProps.name}
                                {!!restaurantThoughtProps.name && restaurantThoughtProps.name}
                                {!!songsThoughtProps.name && songsThoughtProps.name}
                                {!!profileThoughtProps.name && profileThoughtProps.name}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ThoughtsComponent