import React from 'react';
import { Link } from 'react-router-dom';
import { icon_type } from '../../functions';
import { Table } from '../common';
import Loader from '../common/Loader';

import HistoryTableComponent from './HistortTableComponent';

const TableContent = ({ history, data, dispatch, saveThought }) => {
    return <tr>
        <td scope="row" data-item="Image">
            <div className="user-img text-center" style={{cursor: "pointer"}} onClick={() => history.push("/profile/"+data.user_name+"/"+data.user_id)}>
                <a href="javascript:void(0)" ><img src="/assets/images/Avatar.jpeg" alt="user" />
                    <span className="d-block">{data.user_name}</span></a>
            </div>
        </td>
        <td data-item="Title">
            <a href={data.link} target="_blank" className="title">{data.title}</a>
        </td>
        <td align="center" data-item="Icon">
            <span className="icon">
                <img src={icon_type(data.type_id)} alt="cinema" />
            </span>
        </td>
        <td align="right" data-item="Thoughts">
            <a href="javascript:void(0)"
                onClick={() => dispatch(saveThought({ name: data.thoughts, title: data.title }))}
                class="btn thought-btn"
                data-toggle="modal"
                data-target="#thought-modal">Thoughts...</a>
        </td>
    </tr>
}


const FeedTableComponent = (props) => {
    return (
        <div className="content__inner">
            <div className="content-area white-bg">
                <Loader loading={props.feed_loading} />
                <div className="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        <h3 class="highlight-color mb-4">Feed</h3>
                       {!!props.feedListLengthProps ?
                       <div>
                           No feed found!
                       </div>:
                       
                        <Table table={{
                            component: TableContent,
                            history: props.history,
                            saveThought: props.saveThought,
                            dispatch: props.dispatch,
                            list: props.FeedTableProps,
                            class: "table custom-table feed-table four-col-table"
                        }} />
                    }
                    </div>
                    <HistoryTableComponent historyTableProps={props.historyTableProps}
                        history={props.history}
                        historyListLengthProps={props.historyListLengthProps} />
                </div>
            </div>
        </div>
    )
}
export default FeedTableComponent;