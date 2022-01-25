import React from 'react'
import './Team.css'
import {UserNav} from '../Elements/Navigation/UserNav/UserNav'
//import { useSelector } from 'react-redux'
import useProfiles from "../../hooks/profiles/useProfiles";
import {Card} from '../Elements/Cards/Card'

export const Team = (props) => {

    //const user = useSelector((state) => state.user)
    const companyProfiles = useProfiles()
    console.log(companyProfiles)

    return (
        <div className="panel">
            <UserNav/>
            <div className="user-panel">
                {
                    companyProfiles.status === 'success' && companyProfiles.data.data.data.map((profile) => <Card img={profile.attributes.profilePhoto.data.attributes.url} name={profile.attributes.name} date={profile.attributes.createdAt} status={profile.attributes.status}/>)
                }
            </div>
        </div>
    )
}
