import React, { useState, useEffect } from "react";
import useQuestion from "../../hooks/questions/useQuestion";
import { TeamHeader } from "../Elements/TeamHeader/TeamHeader";
import { SelectQuestionType } from "../Elements/Select/SelectQuestionType";
import { Spinner } from "../Elements/Spinner/Spinner";
import { useMutation } from "react-query";
import axiosConfig from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";

export const EditQuestion = () => {
  const question = useQuestion();
  let questionCheck = false;
  const navigate = useNavigate();
  const [questionData, setQuestionData] = useState({ text: "", type: "" });
  console.log(questionData);

  if (question.status === "success") {
    questionCheck = true;
  }

  const mutation = useMutation(
    ({ id, data }) => {
      console.log(data);
      return axiosConfig.put(`/questions/${id}`, data);
    },
    {
      onSuccess: () => {
        navigate("/questions");
      },
    }
  );

  console.log(questionData);

  const questionTypes = [
    { value: "text", label: "Text" },
    { value: "long_text", label: "Long text" },
    { value: "image", label: "Image" },
  ];

  useEffect(() => {
    if (questionCheck) {
      setQuestionData({
        ...questionData,
        text: question.data.data.data[0].attributes.text,
        type: question.data.data.data[0].attributes.type,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionCheck]);

  const handleTypeChange = (event) => {
    setQuestionData({ ...questionData, type: event.value });
  };

  const handleQuestionDataChange = (event) => {
    setQuestionData({
      ...questionData,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditQuestion = (event) => {
    event.preventDefault();
    const data = { data: questionData };
    mutation.mutate({ id: window.location.pathname.split("/")[2], data: data });
  };

  return question.status === "success" && questionCheck ? (
    <div>
      <span>
        <TeamHeader name="Edit Question" />
      </span>
      <form className="question-form">
        <label htmlFor="">Question text</label>
        <input
          value={questionData.text}
          type="text"
          placeholder="Question text"
          name="text"
          onChange={handleQuestionDataChange}
        />
        <label htmlFor="">Question type</label>
        <SelectQuestionType
          defaultValue={questionTypes.find(
            (el) => el.value === question.data.data.data[0].attributes.type
          )}
          options={questionTypes}
          handleTypeChange={handleTypeChange}
        />
        <button className="submit-button" onClick={handleEditQuestion}>
          Save
        </button>
      </form>
    </div>
  ) : (
    <div className="control-center">
      <Spinner />
    </div>
  );
};
