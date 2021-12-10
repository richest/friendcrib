import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { profileLoadingData } from "../../redux/dashboard/profileReducer";
import {Loader} from '../common';

const ProfileComponent = ({ latest_cribs, modifyCrib, userId, userName, dispatch, saveThought , profileTableLength}) => {
    const loadingData = useSelector(profileLoadingData);
    return (
        <div className="content__inner">
            <div className="page-heading">
                <h2 className="h3">{(!!userId && !!userName) ? userName.charAt(0).toUpperCase() + userName.slice(1, userName.length) + "'s" : "My"} Crib</h2>
            </div>
            <div className="content-area white-bg">
                <Loader loading={loadingData} />
                <div className="row box-wrap">
                    {!!profileTableLength ? 
                    <div>
                        No crib found!</div> :
                        <>
                    {latest_cribs.map((item) => (
                        <div className="col-md-4">
                            <div className="box">
                                <div className="box__heading d-flex align-items-center">
                                    <img src={item.img} alt={item.name} className="box__icon" />
                                    <h6>{(!!userId && !!userName) ? userName.charAt(0).toUpperCase() + userName.slice(1, userName.length) + "'s Favorite " + item.display + " " + item.title : (!item.title ? ("My Favorite " + item.display + " ") : "") + (item.edit ? item.title : "...")}</h6>
                                </div>
                                <div className="box__content">
                                    <p>{item.thoughts.length > 105 ? (item.thoughts).slice(0, 105) + "..." : item.thoughts}</p>
                                    <a href="javascript:void(0)" data-toggle="modal" data-target="#thought-modal"><small onClick={() => dispatch(saveThought({ name: item.thoughts, title: item.title }))}>{item.thoughts.length > 105 ? "Read More" : ""}</small></a>
                                </div>
                                {
                                    !userName && !userId &&
                                    <div className="box__footer text-right">
                                    <a href="javascript:void(0)" onClick={() => modifyCrib(item)}>
                                        <span className="add-icon dark-bg">
                                            <img className={item.edit ? "pencil" : ""} src={item.edit ? "/assets/images/pencil.svg" : "/assets/images/plus.svg"} alt="add" />
                                        </span>
                                    </a>
                                </div>
                                }
                            </div>
                        </div>
                    ))}
                    </>
                    }
                </div>
            </div>
        </div>
    )
}
export default ProfileComponent;