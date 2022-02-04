import React from 'react'
import {UserNav} from '../Elements/Navigation/UserNav/UserNav'
import './Questions.css'
import {QuestionHeader} from '../Elements/TeamHeader/QuestionHeader'
import useCompanyQuestions from "../../hooks/questions/useCompanyQuestions";
//import { useSelector } from 'react-redux'
import {QuestionCard} from '../Elements/Cards/QuestionCard'

export const Questions = () => {

    const allCompanyQuestions = useCompanyQuestions()
    console.log(allCompanyQuestions)
    let num = 1

    return (
        <div className="panel">
            <UserNav/>
            <div className="user-panel">
                <QuestionHeader/>
                <div className="question-panel">
                <div className="question-panel-centre">
                {
                    allCompanyQuestions.status === 'success' && allCompanyQuestions.data !== undefined && allCompanyQuestions.data.data.data.map((question) => <QuestionCard number={num++} key={question.id} id={question.id} type={question.attributes.type} text={question.attributes.text}/>)
                }
                </div>
            </div>
            </div>
        </div>
    )
}
