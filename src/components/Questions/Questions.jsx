import React,{useState} from "react";
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
  const allCompanyQuestions = useCompanyQuestions();
  const authProfile = useAuthProfile();
  let questionArray = [];
  let num = 1;
  const [deleteCheck,setDeleteCheck] = useState(false)

  if (allCompanyQuestions.status === "success") {
    if(allCompanyQuestions.data.data.data.length!==0){
      questionArray = allCompanyQuestions.data.data.data;
    }
  }
  console.log(questionArray)

  const mutation = useMutation(async ({ id1, id2, order1, order2 }) => {
    const res1 = await axiosConfig.put(`/questions/${id1}`, {
      data: { order: -423 },
    });
    const res3 = await axiosConfig.put(`/questions/${id1}`, {
      data: { order: order2 },
    });
    const res4 = await axiosConfig.put(`/questions/${id2}`, {
      data: { order: order1 },
    });
    console.log(res1, res3, res4);
  });

  const deleteMutation = useMutation((id) => {
    return axiosConfig.delete(`/questions/${id}`);
  },{
    onMutate:async () => {
      setDeleteCheck(true)
    },
    onSuccess: () => {
      window.location.reload();
    }
  });

  const deleteMutationAnswer = useMutation((id) => {
    return axiosConfig.delete(`/answers/${id}`);
  })

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
    let answers = questionArray[questionArray.findIndex(x => x.id === id)].attributes.answers
    if(answers.data.length!==0){
      for(let i=0;i<answers.data.length;i++){
        console.log(answers.data[i])
        deleteMutationAnswer.mutate(answers.data[i].id)
      }
    }
    deleteMutation.mutate(id);
  };


  return allCompanyQuestions.status === "success" &&
    user.user &&
    user.type === "companyAdmin" &&
    questionArray !== [] &&
    !deleteCheck ? (
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
  questionArray.length!==0 &&
  authProfile.status === 'success' ? (
  <div>
    <QuestionHeader />
    <div>
      <AnswerCard questions={questionArray}/>
    </div>
  </div>
) : allCompanyQuestions.status === "success" &&
  user.user &&
  user.type === "companyUser" &&
  questionArray.length===0 &&
  authProfile.status === 'success' ? (
    <div className="question-panel">
      <div>
        <p>No Questions available</p>
      </div>
    </div>
  ) : (
    <div className="control-center">
      <Spinner />
    </div>
  );
};
/**/