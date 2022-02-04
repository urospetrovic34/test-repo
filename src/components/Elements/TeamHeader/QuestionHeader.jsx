import React from 'react'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import './TeamHeader.css'

export const QuestionHeader = () => {

    const user = useSelector((state) => state.user)

    return (
        <div className="admin-header-container">
            <div>
                <h1>Questions</h1>
            </div>
            {
                user.user && user.type==='companyAdmin' &&
                <div>
                    <Link to='/questions/new'><button className="add-member-button">+ Add new question</button></Link>
                </div>
            }
        </div>
    )
}
