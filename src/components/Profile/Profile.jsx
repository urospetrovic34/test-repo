import React, { useState, useEffect, useRef } from "react";
import { TeamHeader } from "../Elements/TeamHeader/TeamHeader";
import "./Profile.css";
import { useSelector } from "react-redux";
import useAuthProfile from "../../hooks/profiles/useAuthProfile";
import { Spinner } from "../Elements/Spinner/Spinner";
import { FileUpload } from "../Elements/FileUpload/FileUpload";
import { useMutation } from "react-query";
import axiosConfig from "../../config/axiosConfig";

export const Profile = () => {
  const user = useSelector((state) => state.user);
  const profile = user.profile;
  const authProfile = useAuthProfile();
  let profileCheck = false;
  //let sendCheck = false;
  const [sendCheck, setSendCheck] = useState(false);
  const fileInput = useRef(null);
  const fileReader = new FileReader();
  console.log(authProfile);
  const [updatedProfile, setUpdatedProfile] = useState({
    name: "",
    logo: null,
    image: null,
  });

  if (authProfile.status === "success") {
    if (!profileCheck) {
      profileCheck = true;
    }
  }

  const handleProfileNameChange = (event) => {
    setUpdatedProfile({
      ...updatedProfile,
      name: event.target.value,
    });
  };

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

  const handleNothingForNow = (event) => {
    event.preventDefault();
  };

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

  const mutation = useMutation(
    (files) => {
      console.log(updatedProfile)
      const odg = axiosConfig.post("/upload", files);
      console.log(odg)
      return odg
    },
    {
      onMutate:async () => {
        return setSendCheck(true)
      },
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
    return axiosConfig.put(`/profiles/${profile}`, data);
  },{
    onMutate:async () => {
      return setSendCheck(true)
    },
    onSuccess: () => {
      window.location.reload()
    },
  });

  const handleFileClick = (event) => {
    event.preventDefault();
    fileInput.current.click();
  };

  useEffect(() => {
    if (profileCheck) {
      setUpdatedProfile({
        ...updatedProfile,
        name: authProfile.data.data.data.attributes.name,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileCheck]);

  return authProfile.status === "success" && profileCheck && !sendCheck ? (
    <div className="profile-center">
      <span className="profile-header">
        <TeamHeader name="My Profile" />
      </span>
      <form>
        <div className="profile-panel">
          <div className="profile-panel-row-one">
            <label htmlFor="">Name</label>
            <input
              value={updatedProfile.name}
              type="text"
              placeholder="Enter name"
              name="profile-name"
              onChange={handleProfileNameChange}
            />
          </div>
          <div className="profile-panel-row-two">
            <div className="profile-panel-row-two-column-one">
              <img
                className="profile-logo"
                src={
                  updatedProfile.logo
                    ? updatedProfile.image
                    : authProfile.data.data.data.attributes.profilePhoto.data
                        .attributes.url
                }
                alt="#"
              />
              <FileUpload
                fileInput={fileInput}
                wider="wider"
                className="profile-width"
                handleFileClick={handleFileClick}
                handleFileChange={handleFileChange}
              />
            </div>
            <div className="profile-panel-row-two-column-two">
              <p className="profile-label">Email</p>
              <span className="profile-info">
                {
                  authProfile.data.data.data.attributes.user.data.attributes
                    .email
                }
              </span>
              <label htmlFor="">Current password</label>
              <input
                value="********"
                type="text"
                placeholder="Enter name"
                name="profile-name"
                onChange={handleProfileNameChange}
              />
              <label htmlFor="">New password</label>
              <input
                value="********"
                type="text"
                placeholder="Enter name"
                name="profile-name"
                onChange={handleProfileNameChange}
              />
              <button
                className="submit-button wider-hundert"
                onClick={handleNothingForNow}
              >
                Change password
              </button>
            </div>
          </div>
          <div className="profile-panel-row-three">
            <button className="submit-button" onClick={handleEditProfile}>
              Save
            </button>
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
