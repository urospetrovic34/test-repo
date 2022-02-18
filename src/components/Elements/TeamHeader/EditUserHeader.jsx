import React from 'react'
import {SelectUserStatus} from '../../Elements/Select/SelectUserStatus'

export const EditUserHeader = (props) => {

    const statusOptions = [
        { value: 'published', label: 'Published' },
        { value: 'pending', label: 'Pending' }
    ]

    return (
        <div className="admin-header-container">
            <div>
                <h1>Edit team member</h1>
            </div>
            <div className="pending-buttons">
                        <SelectUserStatus options={statusOptions}/>
                <button className="add-member-button" onClick={props.handleDelete}>Delete</button>
            </div>
        </div>
    )
}
