import React, { useEffect, useState, useRef } from "react";
import "./EditUser.css";
import { PendingHeader } from "../Elements/TeamHeader/PendingHeader";
import { FileUpload } from "../Elements/FileUpload/FileUpload";
import { useLocation } from "react-router-dom";
import useCompanyQuestions from "../../hooks/questions/useCompanyQuestions";
import { AnswerModerationCard } from "../Elements/Cards/AnswerModerationCard";
import { Spinner } from "../Elements/Spinner/Spinner";
import { useMutation } from "react-query";
import axiosConfig from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";

export const EditPendingUser = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const profileData = location.state;
  console.log(profileData.profile.id);
  const [sendCheck, setSendCheck] = useState(false);
  const allCompanyQuestions = useCompanyQuestions();
  let questionArray = [];
  const [updatedProfile, setUpdatedProfile] = useState({
    name: "",
    logo: null,
    image: null,
  });
  const fileInput = useRef(null);
  const fileReader = new FileReader();
  let profileCheck = false;
  console.log(profileData);

  if (allCompanyQuestions.status === "success") {
    questionArray = allCompanyQuestions.data.data.data;
    if (!profileCheck) {
      profileCheck = true;
    }
  }

  const handleFileChange = (event) => {
    event.preventDefault();
    if (event.target.files[0] !== undefined) {
      const fileUploaded = event.target.files[0];
      const formData = new FormData();
      formData.append("files", fileUploaded);
      fileReader.readAsDataURL(fileUploaded);
      fileReader.onload = function () {
        setUpdatedProfile({
          ...updatedProfile,
          logo: formData,
          image: fileReader.result,
        });
      };
    } else {
      setUpdatedProfile({ ...updatedProfile, logo: null, image: null });
    }
  };

  const handleFileClick = (event) => {
    event.preventDefault();
    fileInput.current.click();
  };

  const handleProfileNameChange = (event) => {
    setUpdatedProfile({
      ...updatedProfile,
      name: event.target.value,
    });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    mutationDelete.mutate();
  };

  const handleApprove = (event) => {
    event.preventDefault();
    mutationApprove.mutate();
  };

  const mutationDelete = useMutation(() => {
    return axiosConfig.delete(`/profiles/${profileData.profile.id}`);
  },{
    onSuccess: () => {
      alert("User is now deleted")
      navigate("/team/pending")
    },
  });

  const mutationApprove = useMutation(() => {
    let data = { data: { status: "published" } };
    return axiosConfig.put(`/profiles/${profileData.profile.id}`, data);
  },{
    onSuccess: () => {
      alert("User is now published")
      navigate("/team/pending")
    },
  });

  const mutation = useMutation(
    (files) => {
      console.log(files)
      return axiosConfig.post("/upload", files);
    },
    {
      onMutate:async () => {
        return setSendCheck(true)
      },
      onSuccess: (resp) => {
        console.log(resp)
        console.log(resp.data[0].id);
        const data = {
          data: { ...updatedProfile, profilePhoto: resp.data[0].id },
        };
        mutationEditProfile.mutate(data);
      },
    }
  );

  const mutationEditProfile = useMutation((data) => {
    return axiosConfig.put(`/profiles/${profileData.profile.id}`, data);
  },{
    onMutate:async () => {
      return setSendCheck(true)
    },
    onSuccess: () => {
      window.location.reload()
    },
  });

  const handleEditProfile = (event) => {
    event.preventDefault();
    if (updatedProfile.logo) {
      const files = updatedProfile.logo;
      console.log(files)
      mutation.mutate(files);
    } else {
      const data = { data: { name: updatedProfile.name } };
      mutationEditProfile.mutate(data);
    }
  };

  useEffect(() => {
    if (profileCheck) {
      setUpdatedProfile({
        ...updatedProfile,
        name: profileData.profile.attributes.name,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileCheck]);

  return allCompanyQuestions.status === "success" && questionArray.length !== 0 && !sendCheck ? (
    <div className="profile-center">
      <form className="margin-top-15-px">
      <span className="profile-header">
        <PendingHeader handleApprove={handleApprove} handleDelete={handleDelete}/>
      </span>
        <div className="edit-pending-panel">
          <div className="edit-pending-panel-column-one">
            <div className="edit-pending-panel-column-one-row-one">
              <label htmlFor="">Name</label>
              <input
                value={updatedProfile.name}
                className="wider-hundert"
                type="text"
                placeholder="Enter profile name"
                name="profile-name"
                onChange={handleProfileNameChange}
              />
            </div>
            <div className="edit-pending-panel-column-one-row-two">
              <img
                className="profile-moderate-logo"
                src={
                  updatedProfile.logo
                    ? updatedProfile.image
                    : profileData.profile.attributes.profilePhoto.data
                        .attributes.url
                }
                alt="#"
              />
              <FileUpload
                fileInput={fileInput}
                widerHundert="wider-hundert"
                className="company-width"
                handleFileClick={handleFileClick}
                handleFileChange={handleFileChange}
              />
              <button className="submit-button wider-hundert" onClick={handleEditProfile}>Save</button>
            </div>
          </div>
          <div className="edit-pending-panel-column-two">
            <AnswerModerationCard
              profileId={profileData.profile.id}
              questions={questionArray}
            />
          </div>
        </div>
      </form>
    </div>
  ) : allCompanyQuestions.status === "success" && questionArray.length === 0 ? (
    <div className="profile-center">
      <form className="margin-top-15-px">
      <span className="profile-header">
        <PendingHeader handleApprove={handleApprove} handleDelete={handleDelete}/>
      </span>
        <div className="edit-pending-panel">
          <div className="edit-pending-panel-column-one">
            <div className="edit-pending-panel-column-one-row-one">
              <label htmlFor="">Name</label>
              <input
                value={updatedProfile.name}
                className="wider-hundert"
                type="text"
                placeholder="Enter profile name"
                name="profile-name"
                onChange={handleProfileNameChange}
              />
            </div>
            <div className="edit-pending-panel-column-one-row-two">
              <img
                className="profile-moderate-logo"
                src={
                  updatedProfile.logo
                    ? updatedProfile.image
                    : profileData.profile.attributes.profilePhoto.data
                        .attributes.url
                }
                alt="#"
              />
              <FileUpload
                fileInput={fileInput}
                widerHundert="wider-hundert"
                className="company-width"
                handleFileClick={handleFileClick}
                handleFileChange={handleFileChange}
              />
              <button className="submit-button wider-hundert" onClick={handleEditProfile}>Save</button>
            </div>
          </div>
          <div className="edit-pending-panel-column-two">
            <p>No questions available</p>
          </div>
        </div>
      </form>
    </div>
  ) : (
    <div className="control-center">
      <Spinner />
    </div>
  );
};
