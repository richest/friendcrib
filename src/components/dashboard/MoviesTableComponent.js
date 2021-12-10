import React from 'react';
import { Link } from 'react-router-dom';
import ContentBoxComponent from './common/ContentBox';

const TableContent = ({ data, dispatch, saveThought , history}) => {
    return <tr>
        <td data-item="Friend">
            <div className="user-img text-center" style={{cursor: "pointer"}} onClick={() => history.push("/profile")}>
                <a href="javascript:void(0)"><img src="/assets/images/Avatar.jpeg" alt="user" />
                    <span className="d-block">{data.user_name}</span></a>
            </div>
        </td>
        <td data-item="Title">
            <a href={data.link} target="_blank" className="title">{data.title}</a></td>
        <td data-item="Genre"><span className="genere">{data.genre_name}</span></td>
        <td align="right" data-item="Thoughts">
            <a href="javascript:void(0)"
                onClick={() => dispatch(saveThought({ name: data.thoughts, title: data.title }))}
                class="btn thought-btn"
                data-toggle="modal"
                data-target="#thought-modal">Thoughts...</a>
        </td>
        <td align="right">
            <span className="icon cursor-pointer" onClick={() => history.push(`/new_addition/${data.id}/edit/1`)}>
                <img src="/assets/images/edit.svg" alt="cinema" />
            </span>
        </td>
    </tr>

}


const MoviesTableComponent = (props) => {
    return (
        <div className="content__inner">
            <div className="page-heading">
                <h2 className="h3">Movies</h2>
            </div>
            <ContentBoxComponent table={{
                component: TableContent,
                saveThought: props.saveThought,
                dispatch: props.dispatch,
                history: props.history,
                list: props.movieTableProps,
                class: "table custom-table movies-table four-col-table"
            }}
                loading={props.loadingData} 
                checkListLengthProps={props.movieTableLengthProps}
                title="movies"/>
        </div>

    )
}
export default MoviesTableComponent;