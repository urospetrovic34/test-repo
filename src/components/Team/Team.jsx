import React from "react";
import "./Team.css";
import { useSelector } from "react-redux";
import useProfiles from "../../hooks/profiles/useProfiles";
import { Card } from "../Elements/Cards/Card";
import { TeamHeader } from "../Elements/TeamHeader/TeamHeader";
import { Spinner } from "../Elements/Spinner/Spinner";
import { AdminHeader } from "../Elements/TeamHeader/AdminHeader";

export const Team = (props) => {
  const user = useSelector((state) => state.user);
  const companyProfiles = useProfiles();
  console.log(companyProfiles);

  return companyProfiles.status === "success" ? (
    <div>
      {user.user && user.type === "companyAdmin" ? (
        <span>
          <AdminHeader />
        </span>
      ) : (
        <span>
          <TeamHeader name="Team" />
        </span>
      )}
      <div className="card-panel">
        {companyProfiles.status === "success" &&
          companyProfiles.data !== undefined &&
          companyProfiles.data.data.data.map((profile) => (
            <div key={profile.id} className="card">
              <Card
                profile={profile}
                key={profile.id}
                id={profile.id}
                pageType="published"
                img={profile.attributes.profilePhoto.data?.attributes.url}
                name={profile.attributes.name}
                date={profile.attributes.createdAt}
                status={profile.attributes.status}
              />
            </div>
          ))}
      </div>
    </div>
  ) : (
    <div className="control-center">
      <Spinner />
    </div>
  );
};
