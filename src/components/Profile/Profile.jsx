//import React,{useState} from "react";
import { TeamHeader } from "../Elements/TeamHeader/TeamHeader";
//import { useSelector } from 'react-redux'
import useAuthProfile from "../../hooks/profiles/useAuthProfile";

export const Profile = () => {

  //const user = useSelector((state) => state.user)
  const authProfile = useAuthProfile();
  console.log(authProfile)
  /*const [updatedProfile, setUpdatedProfile] = useState({
    name: "",
    logo: null,
    image: null,
  });*/

  return (
    <div>
      <span>
        <TeamHeader name="My Profile" />
      </span>
    </div>
  );
};
