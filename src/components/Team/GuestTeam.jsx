import React, { useEffect, useState } from "react";
import { GuestHeader } from "../Elements/TeamHeader/GuestHeader";
import useGuestProfiles from "../../hooks/profiles/useGuestProfiles";
import useGuestCompany from "../../hooks/companies/useGuestCompany";
import useGuestQuestions from "../../hooks/questions/useGuestQuestions";
import { Card } from "../Elements/Cards/Card";
import { Spinner } from "../Elements/Spinner/Spinner";

export const GuestTeam = () => {
  const [sortData, setSortData] = useState("")
  const [filterData, setFilterData] = useState("")
  const companyProfiles = useGuestProfiles(sortData, filterData);
  const company = useGuestCompany();
  const questions = useGuestQuestions();
  var [profileArray, setProfileArray] = useState([]);
  let timeout = null;
  const [finder, setFinder] = useState(false)

  const setAsyncTimeout = (cb, timeout = 0) =>
    new Promise((resolve) => {
      setTimeout(() => {
        cb();
        resolve();
      }, timeout);
    });

    console.log(companyProfiles)

  const handleFilter = async (event) => {
    clearTimeout(timeout);
    await setAsyncTimeout(() => {
      setFilterData(event)
    }, 1000);
  };

  const handleSort = async (event) => {
    clearTimeout(timeout);
    await setAsyncTimeout(() => {
      setSortData(event.value)
    }, 1000);
  };

  useEffect(() => {
    if(companyProfiles.isRefetching){
      setFinder(true)
    }
    else{
      setFinder(false)
    }
  },[companyProfiles.isRefetching])

  useEffect(() => {
    if (companyProfiles.status === "success") {
      console.log(companyProfiles)
      console.log(profileArray)
      setProfileArray(companyProfiles.data.data.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyProfiles.status]);

  return companyProfiles.status === "success" &&
    company.status === "success" &&
    questions.status === "success" ? (
      <div className="control-center-guest">
        <GuestHeader
          companyData={company.data.data.data}
          handleFilter={handleFilter}
          handleSort={handleSort}
        />
        <div className="card-panel">
          {companyProfiles.status === "success" &&
            companyProfiles.data !== undefined &&
            !finder ? (
              companyProfiles.data.data.data.map((profile) => (
                <div key={profile.id} className="card">
                  <Card
                    profile={profile}
                    questions={questions.data.data.data}
                    key={profile.id}
                    id={profile.id}
                    pageType="published"
                    img={profile.attributes.profilePhoto.data?.attributes.url}
                    name={profile.attributes.name}
                    date={profile.attributes.createdAt}
                    status={profile.attributes.status}
                  />
                </div>
              ))) : (
              <div className="control-center-full">
                <Spinner />
              </div>
            )}
        </div>
      </div>
  ) : (
  <div className="control-center">
    <Spinner />
  </div>
);
};
