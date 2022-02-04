import React from 'react'
import './Team.css'
import {UserNav} from '../Elements/Navigation/UserNav/UserNav'
//import { useSelector } from 'react-redux'
import usePendingProfiles from "../../hooks/profiles/usePendingProfiles";
import {Card} from '../Elements/Cards/Card'
import { TeamHeader } from '../Elements/TeamHeader/TeamHeader';
//import placeholderImage from "../../assets/profile-placeholder.png"

export const PendingTeam = (props) => {

    //const user = useSelector((state) => state.user)
    const pendingProfiles = usePendingProfiles()
    console.log(pendingProfiles)

    return (
        <div className="panel">
            <UserNav/>
            <div className="user-panel">
            <TeamHeader name="Pending for approval"/>
            <div className="card-panel">
                <div className="card-panel-centre">
                {
                    pendingProfiles.status === 'success' && pendingProfiles.data !== undefined && pendingProfiles.data.data.data.map((profile) => <Card key={profile.id} id={profile.id} pageType="pending" img={profile.attributes.profilePhoto.data.attributes.url} name={profile.attributes.name} date={profile.attributes.createdAt} status={profile.attributes.status}/>)
                }
                </div>
            </div>
            </div>
        </div>
    )
}
