import React from 'react'
import './UserNav.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const UserNav = (props) => {

    const user = useSelector((state) => state.user)

    return (
        <div className="admin-nav">
            {
                user.user && user.type === "companyAdmin" && (
                    <Link className="admin-link" to="/team/pending">
                        <div className="admin-option">
                            Pending for approval
                        </div>
                    </Link>
                )
            }
            <Link className="admin-link" to="/team">
                <div className="admin-option">
                    Team
                </div>
            </Link>
            {
                user.user && user.type === "companyAdmin" && (
                    <Link className="admin-link" to="/team/pending">
                        <div className="admin-option">
                            Questions
                        </div>
                    </Link>
                )
            }
            {
                user.user && user.type === "companyAdmin" && (
                    <Link className="admin-link" to="/team/pending">
                        <div className="admin-option">
                            Company Info
                        </div>
                    </Link>
                )
            }
            <Link className="admin-link" to="/team/pending">
                <div className="admin-option">
                    My Profile
                </div>
            </Link>
        </div>
    )
}
