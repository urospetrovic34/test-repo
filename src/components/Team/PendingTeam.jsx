import React from 'react'
import './Team.css'
//import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import usePendingProfiles from "../../hooks/profiles/usePendingProfiles";
import {Card} from '../Elements/Cards/Card'
import { TeamHeader } from '../Elements/TeamHeader/TeamHeader';
import { Spinner } from "../Elements/Spinner/Spinner";
//import placeholderImage from "../../assets/profile-placeholder.png"

export const PendingTeam = (props) => {

    //const user = useSelector((state) => state.user)
    const pendingProfiles = usePendingProfiles()

    return  pendingProfiles.status === 'success' ? (
        <div>
        <TeamHeader name="Pending for approval"/>
        <div className="card-panel">
            <div className="card-panel-centre">
            {
                pendingProfiles.status === 'success' && pendingProfiles.data !== undefined && pendingProfiles.data.data.data.map((profile) => <div className="card-space"><Link className="no-purple" to="#"><Card key={profile.id} id={profile.id} pageType="pending" img={profile.attributes.profilePhoto.data?.attributes.url} name={profile.attributes?.name} date={profile.attributes?.createdAt} status={profile.attributes?.status}/></Link></div>)
            }
            </div>
        </div>
        </div>
    ) : (
        <div className="control-center">
          <Spinner />
        </div>
    )
}
