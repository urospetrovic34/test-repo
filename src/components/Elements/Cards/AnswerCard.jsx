import React from "react";
import "./AnswerCard.css";
import { FileUpload } from "../FileUpload/FileUpload";

export const AnswerCard = (props) => {
  console.log(props.question);
  console.log(props.profile)
  //const intersection = props.question.attributes.answers.filter(element => props.profile.data.data.data.attributes.answers.includes(element))
  //let [answerData,setAnswerData] = useState(null)
  return (
    <div className="answer-card">
      <div className="answer-column-one">
        <p>
          {props.number}/{props.total}
        </p>
      </div>
      <div className="answer-column-two">
        <p>{props.question.attributes.text}</p>
        {props.question.attributes.type === "image" ? <div><FileUpload/></div> : <div><input type="text"/></div>}
      </div>
      <div className="answer-column-three">
        <button>SAVE</button>
        <button onClick={props.handlePreviousQuestion}>PREVIOUS</button>
        <button onClick={props.handleNextQuestion}>NEXT</button>
      </div>
    </div>
  );
};
