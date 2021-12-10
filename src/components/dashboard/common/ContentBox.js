import React from 'react';
import {Loader} from '../../common';
import { Table } from '../../common';

const ContentBoxComponent = ({ table , loading , checkListLengthProps , title}) => {
    return (
        <div className="content-area white-bg">
            <Loader loading={loading}/>
            {!!checkListLengthProps ? 
            <div>No {title} found!</div> :
            <Table class={table.class} table={table} />
}
        </div>
    )
}
export default ContentBoxComponent;