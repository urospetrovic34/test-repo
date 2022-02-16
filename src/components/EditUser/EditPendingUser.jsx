import React from "react";
import "./EditUser.css";
import { PendingHeader } from "../Elements/TeamHeader/PendingHeader";
import { FileUpload } from "../Elements/FileUpload/FileUpload";
//import { AnswerCard } from "../Elements/Cards/AnswerCard";
import useCompanyQuestions from "../../hooks/questions/useCompanyQuestions";

export const EditPendingUser = (props) => {
  const allCompanyQuestions = useCompanyQuestions();
  //let questionArray = [];

  if (allCompanyQuestions.status === "success") {
    //questionArray = allCompanyQuestions.data.data.data;
  }
  return (
    allCompanyQuestions.status === "success" && (
      <div className="profile-center">
        <span className="profile-header">
          <PendingHeader />
        </span>
        <form>
          <div className="edit-pending-panel">
            <div className="edit-pending-panel-column-one">
              <div className="edit-pending-panel-column-one-row-one">
                <label htmlFor="">Name</label>
                <input
                  value=""
                  className="wider-hundert"
                  type="text"
                  placeholder="Enter profile name"
                  name="profile-name"
                />
              </div>
              <div className="edit-pending-panel-column-one-row-two">
                <img
                  className="profile-moderate-logo"
                  src="https://180dc.org/wp-content/uploads/2017/11/profile-placeholder.png"
                  alt="#"
                />
                <FileUpload
                  widerHundert="wider-hundert"
                  className="company-width"
                />
              </div>
            </div>
            <div className="edit-pending-panel-column-one">
            </div>
          </div>
        </form>
      </div>
    )
  );
};
