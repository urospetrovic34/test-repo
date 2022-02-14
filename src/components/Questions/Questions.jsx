import React, { useState } from "react";
import "./Questions.css";
import { QuestionHeader } from "../Elements/TeamHeader/QuestionHeader";
import useCompanyQuestions from "../../hooks/questions/useCompanyQuestions";
import { useSelector } from "react-redux";
import axiosConfig from "../../config/axiosConfig";
import { useMutation } from "react-query";
import { QuestionCard } from "../Elements/Cards/QuestionCard";
import { Spinner } from "../Elements/Spinner/Spinner";
import { AnswerCard } from "../Elements/Cards/AnswerCard";
import useAuthProfile from "../../hooks/profiles/useAuthProfile";

export const Questions = () => {
  const user = useSelector((state) => state.user);
  let [currentQuestion, setCurrentQuestion] = useState(0);
  const allCompanyQuestions = useCompanyQuestions();
  const authProfile = useAuthProfile();
  let questionArray = [];
  let num = 1;

  if (allCompanyQuestions.status === "success") {
    questionArray = allCompanyQuestions.data.data.data;
  }

  const mutation = useMutation(async ({ id1, id2, order1, order2 }) => {
    const res1 = await axiosConfig.put(`/questions/${id1}`, {
      data: { order: -423 },
    });
    const res2 = await axiosConfig.put(`/questions/${id2}`, {
      data: { order: -422 },
    });
    const res3 = await axiosConfig.put(`/questions/${id1}`, {
      data: { order: order2 },
    });
    const res4 = await axiosConfig.put(`/questions/${id2}`, {
      data: { order: order1 },
    });
    console.log(res1, res2, res3, res4);
  });

  const deleteMutation = useMutation((id) => {
    return axiosConfig.delete(`/questions/${id}`);
  });

  const handleOrderUp = (id) => {
    let aux = {};
    const currentIndex = questionArray
      .map(function (question) {
        return question.id;
      })
      .indexOf(id);
    const currentObject = questionArray[currentIndex];
    const previousObject = questionArray[currentIndex - 1];
    if (previousObject !== undefined) {
      aux = questionArray[currentIndex];
      questionArray[currentIndex] = questionArray[currentIndex - 1];
      questionArray[currentIndex - 1] = aux;
      mutation.mutate({
        id1: currentObject.id,
        id2: previousObject.id,
        order1: currentObject.attributes.order,
        order2: previousObject.attributes.order,
      });
    }
  };

  const handleOrderDown = (id) => {
    let aux = {};
    const currentIndex = questionArray
      .map(function (question) {
        return question.id;
      })
      .indexOf(id);
    const currentObject = questionArray[currentIndex];
    const nextObject = questionArray[currentIndex + 1];
    if (nextObject !== undefined) {
      aux = questionArray[currentIndex];
      questionArray[currentIndex] = questionArray[currentIndex + 1];
      questionArray[currentIndex + 1] = aux;
      mutation.mutate({
        id1: currentObject.id,
        id2: nextObject.id,
        order1: currentObject.attributes.order,
        order2: nextObject.attributes.order,
      });
    }
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const handlePreviousQuestion = () => {
    if(currentQuestion+1===1){
      setCurrentQuestion(questionArray.length-1)
      console.log("BANG")
    }
    else{
      setCurrentQuestion(currentQuestion-1)
    }
  }

  const handleNextQuestion = () => {
    if(currentQuestion+1===questionArray.length){
      setCurrentQuestion(0)
      console.log("BANG")
    }
    else{
      setCurrentQuestion(currentQuestion+1)
    }
  }

  /*const handleOrderUp = (id) => {
        let aux = 0
        const currentIndex = allCompanyQuestions.data.data.data.map(
            function(question){return question.id}
        ).indexOf(id)
        const currentObject = allCompanyQuestions.data.data.data[currentIndex]
        const previousObject = allCompanyQuestions.data.data.data[currentIndex-1]
        if(previousObject!==undefined) {
            const a = omitOrder("order",currentObject.attributes)
            const b = omitOrder("order",previousObject.attributes)
            mutation.mutate({"id":previousObject.id,"data":{"data":a}})
            mutation.mutate({"id":currentObject.id,"data":{"data":b}})
        }
    }*/

  /*const handleOrderDown = (id) => {
        
    }*/

  return allCompanyQuestions.status === "success" &&
    user.user &&
    user.type === "companyAdmin" &&
    questionArray !== [] ? (
    <div>
      <QuestionHeader />
      <div className="question-panel">
        <div className="question-panel-centre">
          {allCompanyQuestions.status === "success" &&
            questionArray &&
            questionArray.map((question) => (
              <QuestionCard
                handleOrderUp={() => handleOrderUp(question.id)}
                handleOrderDown={() => handleOrderDown(question.id)}
                handleDelete={() => handleDelete(question.id)}
                number={num++}
                key={question.id}
                id={question.id}
                type={question.attributes.type}
                text={question.attributes.text}
              />
            ))}
        </div>
      </div>
    </div>
  ) : allCompanyQuestions.status === "success" &&
    user.user &&
    user.type === "companyUser" &&
    questionArray !== [] &&
    authProfile.status === 'success' ? (
    <div>
      <QuestionHeader />
      <div>
        <AnswerCard profile={authProfile.data.data.data} total={questionArray.length} number={currentQuestion+1} question={questionArray[currentQuestion]} handleNextQuestion={handleNextQuestion} handlePreviousQuestion={handlePreviousQuestion}/>
      </div>
    </div>
  ) : (
    <div className="control-center">
      <Spinner />
    </div>
  );
};
