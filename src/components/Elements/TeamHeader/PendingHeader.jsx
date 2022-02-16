import React from 'react'

export const PendingHeader = () => {
    return (
        <div className="admin-header-container">
            <div>
                <h1>Moderate team member entry</h1>
            </div>
            <div className="pending-buttons">
                <button className="add-member-button">Approve</button>
                <button className="add-member-button">Delete</button>
            </div>
        </div>
    )
}
