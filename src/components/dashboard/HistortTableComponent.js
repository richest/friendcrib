import moment from 'moment';
import React from 'react';
import { icon_type } from '../../functions';
import { Table } from '../common';

const TableContent = ({ data, history }) => {
    const EditFeed =()=> {
        localStorage.setItem("prevHistory", "yes")
        history.push(`/new_addition/${data.id}/edit/${data.type_id}`)
    }
    return <tr>
        <td>
            <span className="icon">
                <img src={icon_type(data.type_id)} alt="cinema" />
            </span>
        </td>
        <td>
            <a href={data.link} target="_blank" className="title">{data.title}</a>
        </td>
        <td>
            <span className="genere">{data.genre_name}</span>
        </td>
        <td align="right">
            <span className="added-date">{moment(data.created_date).format("DD/MM/YYYY")}</span>
        </td>
        <td align="right">
            <span className="icon cursor-pointer" onClick={EditFeed}>
                <img src="/assets/images/edit.svg" alt="cinema" />
            </span>
        </td>
    </tr>
}

const HistoryTableComponent = (props) => {
    return (
        <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">

            <h3 class="highlight-color mb-4">History</h3>
            {!!props.historyListLengthProps ?
            <div> No history found! </div>:
            <Table table={{
                component: TableContent,
                list: props.historyTableProps,
                history: props.history,
                class: "table custom-table history-table"
            }} />
        }
        </div>
    )
}
export default HistoryTableComponent;