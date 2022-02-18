import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { EditUserHeader } from "../Elements/TeamHeader/EditUserHeader";
import useCompanyQuestions from "../../hooks/questions/useCompanyQuestions";
import { useMutation } from "react-query";
import axiosConfig from "../../config/axiosConfig";
import { FileUpload } from "../Elements/FileUpload/FileUpload";
import { AnswerModerationCard } from "../Elements/Cards/AnswerModerationCard";
import { Spinner } from "../Elements/Spinner/Spinner";

export const EditUser = () => {
    const location = useLocation();
    const profileData = location.state;
    console.log(profileData.profile.id);
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
    });
  
    const mutationApprove = useMutation(() => {
      let data = { data: { status: "published" } };
      return axiosConfig.put(`/profiles/${profileData.profile.id}`, data);
    });
  
    const mutation = useMutation(
      (files) => {
        return axiosConfig.post("/upload", files);
      },
      {
        onSuccess: (resp) => {
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
      onSuccess: () => {
        console.log("USPESNO")
        window.location.reload()
      },
    });
  
    const handleEditProfile = (event) => {
      event.preventDefault();
      if (updatedProfile.logo) {
        const files = updatedProfile.logo;
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
    return allCompanyQuestions.status === "success" && questionArray !== [] ? (
        <div className="profile-center">
          <span className="profile-header">
            <EditUserHeader handleApprove={handleApprove} handleDelete={handleDelete}/>
          </span>
          <form className="margin-top-15-px">
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
      ) : (
        <div className="control-center">
          <Spinner />
        </div>
      );
}
