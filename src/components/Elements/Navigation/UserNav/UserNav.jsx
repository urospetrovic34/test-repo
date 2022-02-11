import './UserNav.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const UserNav = (props) => {

    const user = useSelector((state) => state.user)
    console.log(user)

    return (
        user.user && user.type && (
            <div className="admin-nav">
                <div className="admin-label">
                    <div className="admin-label-option">
                        {user.companyName}
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
                        <Link className="admin-link" to="/company">
                            <div className="admin-option">
                                Company Info
                            </div>
                        </Link>
                    )
                }
                <Link className="admin-link" to="/profile">
                    <div className="admin-option">
                        My Profile
                    </div>
                </Link>
            </div>
        )
    )
}
