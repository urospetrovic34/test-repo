import React, { useState,useEffect,useRef } from "react";
import "./AnswerModerationCard.css";
import axiosConfig from "../../../config/axiosConfig";
import { useMutation } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import placeholderImage from "../../../assets/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg";
import { FileUpload } from "../FileUpload/FileUpload";

export const AnswerModerationCard = (props) => {
  const profile = props.profileId;
  var [index, setIndex] = useState(0);
  var answerExistCheck = false;
  const [image, setImage] = useState({ formData: null, image: null });
  var question = props.questions[0].id;
  var existingAnswer = "";
  const fileInput = useRef(null);
  const fileReader = new FileReader();
  var url = ''
  var editId = -5
  const [answerData, setAnswerData] = useState({
    answer: '',
    question: question,
    profile: profile,
  });
  console.log(props.questions)

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
    if (answer.attributes.profile.data?.id === profile) {
      answerExistCheck = true;
      existingAnswer = answer.attributes.answer;
      editId = answer.id
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
          alert("USPESAN ODGOVOR")
      }
  });

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

  const handleSubmitAnswerData = (event) => {
    event.preventDefault();
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
    <div className="answer-card-moderated">
      <div className="answer-card-row-one-moderated">
        <p className="answer-title-moderated">
          Question {index + 1} : {props.questions[index].attributes.text}
        </p>
      </div>
      <div className="answer-card-row-two-moderated">
        {props.questions[index].attributes.type === "image" ? (
          <span className="answer-card-row-two-sub-layer-moderated">
            <div>
              <img
                className="answer-logo-moderated"
                src={image.image ? image.image : placeholderImage}
                alt="#"
              />
            </div>
            <div className="answer-card-row-two-submit-area-moderated">
                <div className="wider-fifty">
              <FileUpload
                fileInput={fileInput}
                widerHundert="wider-hundert"
                handleFileClick={handleFileClick}
                handleFileChange={handleFileChange}
              />
                </div>
                <div className="wider-fifty">
              <button
                className="submit-button file-upload-button wider-hundert"
                onClick={handleSubmitAnswerData}
              >
                Save
              </button>
                </div>
            </div>
          </span>
        ) : (
          <span className="answer-card-row-two-sub-layer-variation-moderated">
            <input
              value={answerData.answer}
              type="text"
              name="answer"
              className="wider-hundert"
              onChange={handleAnswerText}
            />
            <div className="answer-card-row-two-submit-area-variation">
            <button className="submit-button file-upload-button wider-hundert" onClick={handleSubmitAnswerData}>
              Save
            </button>
            </div>
          </span>
        )}
        </div>
      <div className="answer-card-row-three-moderated">
        <button className="arrow-button-moderated" onClick={handleDecrement}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <span className="answer-number-moderated">
          {index + 1}/{props.questions.length}
        </span>
        <button className="arrow-button-moderated" onClick={handleIncrement}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button></div>
    </div>
  )
};
