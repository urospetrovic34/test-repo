import React,{useState,useEffect} from "react";
import "./AnswerCard.css";
import { FileUpload } from "../FileUpload/FileUpload";

export const AnswerCard = (props) => {
  const [answerData, setAnswerData] = useState("");
  let existCheck = false
  console.log(answerData)
  if (
    props.profile.attributes.answers.data.length > 0 &&
    props.question.attributes.answers.data.length > 0
  ) {
    existCheck = true
  }

  useEffect(() => {
    if (existCheck) {
        let match = props.question.attributes.answers.data.filter(el1 => props.profile.attributes.answers.data.some(el2 => el1.id === el2.id))
        setAnswerData(match[0].attributes.answer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existCheck]);

  useEffect(() => {
      if(props.handlePreviousQuestion || props.handleNextQuestion){
        setAnswerData("")
      }
  },[props.handlePreviousQuestion,props.handleNextQuestion])

  return (
    <div className="answer-card">
      <div className="answer-column-one">
        <p>
          {props.number}/{props.total}
        </p>
      </div>
      <div className="answer-column-two">
        <p>{props.question.attributes.text}</p>
        {props.question.attributes.type === "image" ? (
          <div>
            <FileUpload />
          </div>
        ) : (
          <div>
            <input type="text" />
          </div>
        )}
      </div>
      <div className="answer-column-three">
        <button>SAVE</button>
        <button onClick={props.handlePreviousQuestion}>PREVIOUS</button>
        <button onClick={props.handleNextQuestion}>NEXT</button>
      </div>
    </div>
  );
};
