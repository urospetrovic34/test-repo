import React from 'react'
import './UserNav.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useCompany from "../../../../hooks/companies/useCompany";

export const UserNav = (props) => {

    const user = useSelector((state) => state.user)
    const company = useCompany()
    //console.log(company)

    return (
        <div className="admin-nav">
            <div className="admin-label">
                <div className="admin-label-option">
                    {company.status === 'success' && company.data.data.data.attributes.name}
                </div>
            </div>
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
            <Link className="admin-link" to="/questions">
                <div className="admin-option">
                    Questions
                </div>
            </Link>
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
