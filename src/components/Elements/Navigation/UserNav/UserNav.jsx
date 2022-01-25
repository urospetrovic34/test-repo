import React from 'react'
import './UserNav.css'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

export const UserNav = (props) => {
    
    const user = useSelector((state) => state.user)

    return (
        <div className="admin-nav">
            {
                user.user && user.type==="companyAdmin" && (
                    <div className="admin-option">
                        <Link className="admin-link" to="/team/pending">Pending for approval</Link>
                    </div>
                )
            }
            <div className="admin-option">
                <Link className="admin-link" to="/team">Team</Link>
            </div>
            {
                user.user && user.type==="companyAdmin" && (
                    <div className="admin-option">
                        <Link className="admin-link" to="/team/pending">Questions</Link>
                    </div>
                )
            }
            {
                user.user && user.type==="companyAdmin" && (
                    <div className="admin-option">
                        <Link className="admin-link" to="/team/pending">Company Info</Link>
                    </div>
                )
            }
            <div className="admin-option">
                <Link className="admin-link" to="/team/pending">My Profile</Link>
            </div>
        </div>
    )
}
