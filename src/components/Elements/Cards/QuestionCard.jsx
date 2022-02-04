import React from 'react'
import './QuestionCard.css'
//import {UserNav} from '../Navigation/UserNav/UserNav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown,faChevronUp } from '@fortawesome/free-solid-svg-icons'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

export const QuestionCard = (props) => {

    const user = useSelector((state) => state.user)
    const editQuestionLink = `/questions/${props.id}/edit`

    const firstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className="question-card">
            <div className="question-column-one">
                <button><FontAwesomeIcon icon={ faChevronUp }/></button>
                <button><FontAwesomeIcon icon={ faChevronDown }/></button>
            </div>
            <div className="question-column-two">
                <p>Question {props.number} - {firstLetter(props.type)}</p>
                <p>{firstLetter(props.text)}</p>
            </div>
            {
                    user.user && user.type==="companyAdmin" && (
                        <div className="question-column-three">
                            <Link to={editQuestionLink}><button>Edit</button></Link>
                            <button>Delete</button>
                        </div>
                    )
                }
        </div>
    )
}
