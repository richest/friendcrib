import React from 'react';
import { Link } from 'react-router-dom';
import ContentBoxComponent from './common/ContentBox';

const tableContent = ({ data, dispatch, declineNotificationId, acceptNotificationId, history }) => {
    return <tr>
        <td data-item="Image">
            <div className="user-img text-center" style={{cursor: "pointer"}}>
                <a href="javascript:void(0)"><img src="/assets/images/Avatar.jpeg" alt="user" />
                    <span className="d-block">{data.user_data.username}</span></a>
            </div>
        </td>
        <td data-item="Name">
            <span className="title">{data.user_data.Message}</span>
        </td>
            <td align="right" data-item="Action">
            {data.type_id ===0?
                <div className="notification__action">
                    <a href="javascript:void(0)" className="accepted" onClick={() => dispatch(acceptNotificationId(data.notifications_id))}>
                        <img src="/assets/images/accepted.svg" alt="accepted" /></a>
                    <a href="javascript:void(0)" className="rejected" onClick={() => dispatch(declineNotificationId(data.notifications_id))}>
                        <img src="/assets/images/rejected.svg" alt="rejected" /></a>
                </div>
                 : ""}
            </td>
    </tr>
}


const AllNotificationComponent = (props) => {
    return (
        <div className="content__inner">
            <div className="page-heading">
                <h2 className="h3">All Notifications</h2>
            </div>
            <ContentBoxComponent table={{
                component: tableContent,
                history: props.history,
                list: props.allNotificationProp,
                class: "table custom-table three-col-table",
                dispatch: props.dispatch,
                declineNotificationId: props.declineNotificationId,
                acceptNotificationId: props.acceptNotificationId
            }}
                loading={props.loadingData}
                checkListLengthProps={props.notiTableLengthProps}
                title="notifications"
            />
        </div>
    )
}
export default AllNotificationComponent