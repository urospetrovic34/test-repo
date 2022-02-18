import React from "react";
import "./Sidenav.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Sidenav = (props) => {
  const user = useSelector((state) => state.user);

  return user.user && user.type && (
    <div className="side-nav">
      <div className="admin-label">
        <div className="admin-label-option-label">{user.companyName}</div>
      </div>
      {user.user && user.type === "companyAdmin" && (
        <Link
          className="admin-link"
          to="/team/pending"
          onClick={props.routeAndClose}
        >
          <div className="admin-option">Pending for approval</div>
        </Link>
      )}
      <Link className="admin-link" to="/team" onClick={props.routeAndClose}>
        <div className="admin-option">Team</div>
      </Link>
      <Link
        className="admin-link"
        to="/questions"
        onClick={props.routeAndClose}
      >
        <div className="admin-option">Questions</div>
      </Link>
      {user.user && user.type === "companyAdmin" && (
        <Link
          className="admin-link"
          to="/company"
          onClick={props.routeAndClose}
        >
          <div className="admin-option">Company Info</div>
        </Link>
      )}
      <Link className="admin-link" to="/profile" onClick={props.routeAndClose}>
        <div className="admin-option">My Profile</div>
      </Link>
    </div>
  );
};
