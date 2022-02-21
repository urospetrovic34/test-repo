import React, { useState, useEffect, useRef } from "react";
import "./AnswerCard.css";
import { FileUpload } from "../FileUpload/FileUpload";
import { useSelector } from "react-redux";
import axiosConfig from "../../../config/axiosConfig";
import { useMutation } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import placeholderImage from "../../../assets/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg";

export const AnswerCard = (props) => {
  const user = useSelector((state) => state.user);
  const profile = user.profile;
  var [index, setIndex] = useState(0);
  var question = props.questions[0].id;
  const [answerData, setAnswerData] = useState({
    answer: '',
    question: question,
    profile: profile,
  });
  const fileInput = useRef(null);
  const fileReader = new FileReader();
  var editId = -5
  var answerExistCheck = false;
  var existingAnswer = "";
  var url = ''
  const [image, setImage] = useState({ formData: null, image: null });

  const handleIncrement = (event) => {
    event.preventDefault()
    answerExistCheck = false;
    if (index === props.questions.length - 1) {
      setIndex(0);
      let question = props.questions[0].id;
      setAnswerData({ ...answerData,answer:'', question: question });
      setImage({ ...image, formData: null, image: null });
    } else {
      setIndex(index + 1);
      let question = props.questions[index + 1].id;
      setAnswerData({ ...answerData,answer:'', question: question });
      setImage({ ...image, formData: null, image: null });
    }
  };

  const handleDecrement = (event) => {
    event.preventDefault()
    answerExistCheck = false;
    if (index < 1) {
      setIndex(props.questions.length - 1);
      let question = props.questions[props.questions.length - 1].id;
      setAnswerData({ ...answerData,answer:'', question: question });
      setImage({ ...image, formData: null, image: null });
    } else {
      setIndex(index - 1);
      let question = props.questions[index - 1].id;
      setAnswerData({ ...answerData,answer:'', question: question });
      setImage({ ...image, formData: null, image: null });
    }
  };

  // eslint-disable-next-line array-callback-return
  props.questions[index].attributes.answers.data?.map((answer) => {
    if (answer.attributes.profile.data?.id === user.profile) {
      answerExistCheck = true;
      existingAnswer = answer.attributes.answer;
      editId = answer.id
      console.log(existingAnswer)
      return (existingAnswer, answerExistCheck,editId);
    }
  });

  const handleAnswerText = (event) => {
    setAnswerData({ ...answerData, answer: event.target.value });
  };

  const handleFileClick = (event) => {
    event.preventDefault();
    fileInput.current.click();
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    if (event.target.files[0] !== undefined) {
      const fileUploaded = event.target.files[0];
      const formData = new FormData();
      formData.append("files", fileUploaded);
      fileReader.readAsDataURL(fileUploaded);
      fileReader.onload = function () {
        setImage({
          ...image,
          formData: formData,
          image: fileReader.result,
        });
      };
    } else {
      setImage({ ...image, formData: null, image: null });
    }
  };

  const mutation = useMutation((data) => {
    return axiosConfig.post("/answers", data);
  },{
      onSuccess:() => {
          alert("Answer sent")
      }
  });

  const mutationImage = useMutation(
    (formData) => {
      return axiosConfig.post("/upload", formData);
    },
    {
      onSuccess: (response) => {
        url = response.data[0].url
        //NESTO JE SETANSWERDATA OVDE PRAVIO PROBLEM I BRISAO URL PRILIKOM SVAKOG DODAVANJA NEPOSREDNO 
        //I ZATO SAM STAVIO OVAKO
        const data = { data: {answer:url,question:answerData.question,profile:answerData.profile} };
        mutation.mutate(data);
      },
    }
  );

  const mutationEdit = useMutation((data) => {
    return axiosConfig.put(`/answers/${editId}`, data);
  },{
      onSuccess:() => {
          alert("USPESNA IZMENA")
      }
  });

  const mutationEditImage = useMutation(
    (formData) => {
      return axiosConfig.post("/upload", formData);
    },
    {
      onSuccess: (response) => {
        url = response.data[0].url
        //NESTO JE SETANSWERDATA OVDE PRAVIO PROBLEM I BRISAO URL PRILIKOM SVAKOG DODAVANJA NEPOSREDNO 
        //I ZATO SAM STAVIO OVAKO
        const data = { data: {answer:url} };
        mutationEdit.mutate(data);
      },
    }
  );

  const handleSubmitAnswerData = () => {
    if (image.formData && !answerExistCheck) {
      mutationImage.mutate(image.formData);
    } else if (answerData.answer && !answerExistCheck) {
      const data = { data: answerData };
      mutation.mutate(data);
    }
    else if(image.formData && !answerExistCheck){
        mutationEditImage.mutate(image.formData);
    }
    else if(answerData.answer && answerExistCheck){
        const data = { data: {answer:answerData.answer} };
        mutationEdit.mutate(data);
    }
  };

  const checkAnswers = () => {
    if (
      answerExistCheck &&
      props.questions[index].attributes.type === "image"
    ) {
      setImage({ ...image, formData: null, image: existingAnswer });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    } else if (
      answerExistCheck &&
      props.questions[index].attributes.type !== "image"
    ) {
      setAnswerData({ ...answerData, answer: existingAnswer });
    } else {
      setAnswerData({ ...answerData, answer: "" });
      setImage({ ...image, formData: null, image: null });
    }
  }

  useEffect(() => {
    checkAnswers()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerExistCheck,index]);

  return (
    <div className="answer-card">
      <div className="answer-card-row-one">
        <p className="answer-title">
          Question {index + 1} : {props.questions[index].attributes.text}
        </p>
      </div>
      <div className="answer-card-row-two">
        {props.questions[index].attributes.type === "image" ? (
          <span className="answer-card-row-two-sub-layer">
            <div>
              <img
                className="answer-logo"
                src={image.image ? image.image : placeholderImage}
                alt="#"
              />
            </div>
            <div className="answer-card-row-two-submit-area">
              <FileUpload
                fileInput={fileInput}
                handleFileClick={handleFileClick}
                handleFileChange={handleFileChange}
              />
              <button
                className="submit-button file-upload-button"
                onClick={handleSubmitAnswerData}
              >
                Save
              </button>
            </div>
          </span>
        ) : (
          <span className="answer-card-row-two-sub-layer-variation">
            <input
              value={answerData.answer}
              type="text"
              name="answer"
              className="wider-2x"
              onChange={handleAnswerText}
            />
            <div className="answer-card-row-two-submit-area-variation">
            <button className="submit-button file-upload-button" onClick={handleSubmitAnswerData}>
              Save
            </button>
            </div>
          </span>
        )}
      </div>
      <div className="answer-card-row-three">
        <button className="arrow-button" onClick={handleDecrement}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <span className="answer-number">
          {index + 1}/{props.questions.length}
        </span>
        <button className="arrow-button" onClick={handleIncrement}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};
