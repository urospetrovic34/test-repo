import React from "react";
import './EditUser.css'
import { PendingHeader } from "../Elements/TeamHeader/PendingHeader";
import { FileUpload } from "../Elements/FileUpload/FileUpload";

export const EditPendingUser = () => {
  return (
    <div className="profile-center">
      <span className="profile-header">
        <PendingHeader />
      </span>
      <form>
        <div className="edit-pending-panel">
          <div className="edit-pending-panel-col-one">
            <div className="edit-pending-panel-col-one-header"></div>
            <div>
              <label htmlFor="">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                name="profile-name"
              />
              <img
                className="company-logo"
                alt="#"
              />
              <FileUpload
                wider="wider"
                className="company-width"
              />
            </div>
          </div>
          <div className="edit-pending-panel-col-two"></div>
        </div>
      </form>
    </div>
  );
};
