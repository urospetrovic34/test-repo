import React from 'react'
import './TeamMember.css'
import pic from '../../assets/profile.jpg'


function closeTeamMember() {

}

var qas =[{
    "question": "Do you have any pets?",
    "answer": "Yes"
},
{
    "question": "question-2",
    "answer": 123
},
{
    "question": "question-3",
    "answer": "answer-3"
}   
]
var name = "Juan Veron"


export const TeamMember = () => {
    return (
        
        <div className="member-modal">
            <div className="member-modal-content">
                <div className="member-modal-exit">
                    <i class="fa fa-3x fa-times member-modal-exit-icon" onClick={closeTeamMember}></i>
                </div>
                <div className="member-modal-items">
                    <div className="member-modal-item-row member-modal-item-anchor">
                        <div>
                            <img src={pic} alt="profile-pic" className="profile-photo"/>
                        </div>
                        <div className="name">
                            {name}
                        </div>   
                    </div>
                    
                    <div className="qa">
                    {qas.map(qa =>
                    <div className="member-modal-item-col member-modal-item-anchor">
                        <div className="question">
                            {qa.question}
                        </div>
                        {typeof(qa.answer) === "string" ?
                        <div className="answer">
                            {qa.answer}
                        </div>
                        :
                        <div>
                            <img src={pic} alt="profile-pic" className="profile-photo"/>
                        </div>
                        }
                    </div>
                     )}
                     </div>
                </div>
            </div>
        </div>

    )
}
