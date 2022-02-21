import React from "react";
import "./TeamHeader.css";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import axiosConfig from "../../../config/axiosConfig";

export const AdminHeader = () => {

  const user = useSelector((state) => state.user);
  let regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleNewMember = () => {
    let email = prompt("Please enter email")
    if(email && regex.test(email)){
        mutation.mutate(email)
    }
    else{
        alert("Input is not valid")
    }
  };

  const mutation = useMutation(
    (email) => {
      return axiosConfig.post("/invite", {data:{email:email,companySlug:user.companyName.replace(/\s+/g, "").toLowerCase()}});
    }
  );

  return (
    <div className="admin-header-container">
      <div>
        <h1>Team</h1>
      </div>
      <div>
        <button onClick={handleNewMember} className="add-member-button">
          + Add new team member
        </button>
      </div>
    </div>
  );
};
