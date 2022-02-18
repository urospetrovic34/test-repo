import React, { useState, useEffect } from "react";
import { SelectQuestionType } from "../Elements/Select/SelectQuestionType";
import { TeamHeader } from "../Elements/TeamHeader/TeamHeader";
import axiosConfig from "../../config/axiosConfig";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import useQuestions from "../../hooks/questions/useQuestions";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../Elements/Spinner/Spinner";

export const AddQuestion = () => {
  const questionTypes = [
    { value: "text", label: "Text" },
    { value: "long_text", label: "Long text" },
    { value: "image", label: "Image" },
  ];

  const user = useSelector((state) => state.user);
  const [questionData, setQuestionData] = useState({
    text: "",
    type: questionTypes[0].value,
    order: "",
    company: user.company,
  });
  const allQuestions = useQuestions();
  const navigate = useNavigate();
  let orders = [];
  let maxOrder = [];
  let orderCheck = false;

  if (allQuestions.status === "success") {
    allQuestions.data.data.data.map((question, index) =>
      orders.push({ order: question.attributes.order })
    );
    if (!orderCheck) {
      orderCheck = true;
    }
    maxOrder = Math.max.apply(
      Math,
      orders.map(function (o) {
        return o.order;
      })
    );
  }

  const mutation = useMutation(
    (data) => {
      return axiosConfig.post("/questions", data);
    },
    {
      onSuccess: () => {
        navigate("/questions");
      },
    }
  );
  console.log(allQuestions)
  console.log(orderCheck)
  console.log(maxOrder);

  const handleAddQuestion = (event) => {
    event.preventDefault();
    // const data = {"data" : questionData}
    const data = { data: questionData };
    console.log(user);
    console.log(data);
    mutation.mutate(data);
  };

  const handleQuestionDataChange = (event) => {
    setQuestionData({
      ...questionData,
      [event.target.name]: event.target.value,
    });
    //console.log(questionData)
    console.log(questionData);
  };

  const handleTypeChange = (event) => {
    console.log(allQuestions);
    setQuestionData({ ...questionData, type: event.value });
  };

  useEffect(() => {
    if (orderCheck) {
      setQuestionData({ ...questionData, order: maxOrder + 1 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderCheck]);

  return allQuestions.status === 'success' && orderCheck && maxOrder !== [] ? (
    <div>
      <span>
        <TeamHeader name="Add new Question" />
      </span>
      <form className="question-form">
        <label htmlFor="">Question text</label>
        <input
          type="text"
          placeholder="Question text"
          name="text"
          onChange={handleQuestionDataChange}
        />
        <label htmlFor="">Question type</label>
        <SelectQuestionType
          options={questionTypes}
          handleTypeChange={handleTypeChange}
        />
        <button className="submit-button" onClick={handleAddQuestion}>
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
