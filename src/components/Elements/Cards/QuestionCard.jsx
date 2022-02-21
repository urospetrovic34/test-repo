import React from 'react'
import './QuestionCard.css'
//import {UserNav} from '../Navigation/UserNav/UserNav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const QuestionCard = (props) => {

    const user = useSelector((state) => state.user)
    const editQuestionLink = `/questions/${props.id}/edit`

    const firstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className="question-card">
            <div className="question-column-one">
                <button className="submit-button-small" onClick={() => props.handleOrderUp(props.id)}><FontAwesomeIcon icon={faChevronUp} /></button>
                <button className="submit-button-small" onClick={() => props.handleOrderDown(props.id)}><FontAwesomeIcon icon={faChevronDown} /></button>
            </div>
            <div className="question-column-two">
                <p>Question {props.number} - {firstLetter(props.type).replace(/_|-|\\. /g, ' ')}</p>
                <p>{firstLetter(props.text)}</p>
            </div>
            {
                user.user && user.type === "companyAdmin" && (
                    <div className="question-column-three">
                        <Link to={editQuestionLink}><button className="edit-question-button">Edit</button></Link>
                        <button className="delete-button" onClick={() => props.handleDelete(props.id)}>Delete</button>
                    </div>
                )
            }
        </div>
    )
}
