import React from 'react';

const Table = ({ table }) => {
    const TableInner = table.component;
    return (
        <table className={table.class}>
            <tbody>
                {
                    table.list.map((data, index) => {
                        return <TableInner
                            key={index}
                            data={data}
                            dispatch={table.dispatch}
                            history={table.history}
                            saveThought={table.saveThought}
                            sendFriendRequest={table.sendFriendRequest}
                            acceptNotificationId={table.acceptNotificationId}
                            declineNotificationId={table.declineNotificationId} />
                    })
                }
            </tbody>
        </table>
    )
}
export default Table;