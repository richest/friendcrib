import React from 'react';
import { Link } from 'react-router-dom';
import ContentBoxComponent from './common/ContentBox';

const TableContent = ({ history, data }) => {
  return <tr>
    <td scope="row" data-item="Image">
      <div className="user-img text-center" style={{cursor: "pointer"}} onClick={() => history.push("/profile/"+data.username+"/"+data.user_id)}>
        <a href="javascript:void(0)" >
          <img src="/assets/images/Avatar.jpeg" alt="user" />
        </a>
      </div>
    </td>
    <td data-item="Name">
      <span  className="title">{data.username} </span>
    </td>
    <td align="right" data-item="Friend">
      <span>{data.friends_created_at}</span>
    </td>
  </tr>

}

const FriendTableComponent = (props) => {
  return (
    <div className="content__inner">
      <div className="page-heading">
        <h2 className="h3">Friends</h2>
        <a href="javascript:void(0)" data-toggle="modal" data-target="#invite-modal" className="btn rounded-0">Spread the word</a>
      </div>
      <ContentBoxComponent table={{ component: TableContent, history: props.history, list:props.friendTableProps, class: "table custom-table friends-table three-col-table" }} 
       loading={props.loadingData}
       checkListLengthProps={props.friendTableLengthProps}
       title="friends"/>
    </div>
  )
}
export default FriendTableComponent;