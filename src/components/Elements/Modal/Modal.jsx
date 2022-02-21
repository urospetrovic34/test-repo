import React from "react";
import "./Modal.css";

export const Modal = (props) => {
  // props.questions[index].attributes.answers.data?.map((answer) => {
  //     if (answer.attributes.profile.data?.id === profile) {
  //       answerExistCheck = true;
  //       existingAnswer = answer.attributes.answer;
  //       editId = answer.id
  //       return (existingAnswer, answerExistCheck,editId);
  //     } else {
  //       answerExistCheck = false;
  //       existingAnswer = ''
  //       editId = -5
  //       return (existingAnswer, answerExistCheck,editId);
  //     }
  //   });

  console.log(props.answers);

  return (
    <div className="modal">
      <div className="modal-relative-oblast">
          <div>
            <h1 className="modal-title">{props.profile.attributes.name}</h1>
          </div>
        <div className="modal-user-section">
            <img
              className="modal-avatar"
              src={props.profile.attributes.profilePhoto.data?.attributes.url}
              alt="$"
            />
        </div>
        <div className="modal-question-section">
          {props.answers.data.data.data?.map((x) => (
            <div>
              <div className="question-text"> • {x.attributes.question.data?.attributes.text}</div>
              <div>
                {x.attributes.question.data?.attributes.type === "image" ? (
                  <img src={x.attributes.answer} alt="#" />
                ) : (
                  <p className="answer-text">{x.attributes.answer}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
