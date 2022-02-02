import React from 'react'
import './TeamHeader.css'
import {Link} from 'react-router-dom'

export const AdminHeader = () => {
    return (
        <div className="admin-header-container">
            <div>
                <h1>Team</h1>
            </div>
            <div>
                <Link to='/'><button>+ Add new team member</button></Link>
            </div>
        </div>
    )
}
