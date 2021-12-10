import React from 'react';
import { Link } from 'react-router-dom';
import { getCookie } from '../../functions';
import ContentBoxComponent from './common/ContentBox';

const TableContent = ({ data, sendFriendRequest, history }) => {
  let profileData = !!getCookie("profile") ? JSON.parse(getCookie("profile")) : null;
  return <tr>
    <td scope="row" data-item="Image">
      <div className="user-img text-center" style={{cursor: "pointer"}} onClick={() => history.push("/profile/"+data.username+"/"+data.id)}>
        <a href="javascript:void(0)">
          <img src="/assets/images/Avatar.jpeg" alt="user" />
        </a>
      </div>
    </td>
    <td data-item="Name">
      <a href="javascript:void(0)" className="title">{data.username + " , " + data.city + " , " + data.country} </a>
    </td>
    <td align="right" data-item="Friend">
      {data.friend == false ?
        (profileData.user_id === data.id ? ""
          : data.Notifications === false ?
            <span className="add-icon dark-bg cursor-pointer" onClick={() => sendFriendRequest(data.id)}>
              <img src="/assets/images/plus.svg" alt="add" />
            </span>
            : data.Notifications === true ? <small className="btn btn-sm invied-btn ">invited</small>
              : "")
        :
        <span className="add-icon dark-bg">
          <img src="/assets/images/accepted.svg" alt="add" />
        </span>
      }

    </td>
  </tr>

}


const SearchTableComponent = (props) => {

  return (
    <div className="content__inner">
      <div className="page-heading">
        <h2 className="h3">Search Friends</h2>
      </div>
      <ContentBoxComponent table={{
        component: TableContent,
        list: props.searchTableProp,
        history: props.history,
        sendFriendRequest: props.sendFriendRequest,
        class: "table custom-table friends-table three-col-table"
      }}
        loading={props.loadingData}
        checkListLengthProps={props.checkListLengthProps} 
        title="friend"/>
    </div>
  )
}
export default SearchTableComponent;