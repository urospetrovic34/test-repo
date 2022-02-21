import React from 'react'

export const PendingHeader = (props) => {
    return (
        <div className="admin-header-container">
            <div>
                <h1 className="pending-header">Moderate team member entry</h1>
            </div>
            <div className="pending-buttons">
                <button className="add-member-button" onClick={props.handleApprove}>Approve</button>
                <button className="add-member-button" onClick={props.handleDelete}>Delete</button>
            </div>
        </div>
    )
}
