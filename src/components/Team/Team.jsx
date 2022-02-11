import React from 'react'
import './Team.css'
import { useSelector } from 'react-redux'
import useProfiles from "../../hooks/profiles/useProfiles";
import {Card} from '../Elements/Cards/Card'
import { TeamHeader } from '../Elements/TeamHeader/TeamHeader';
import { AdminHeader } from '../Elements/TeamHeader/AdminHeader';

export const Team = (props) => {

    const user = useSelector((state) => state.user)
    const companyProfiles = useProfiles()
    console.log(companyProfiles)

    return (
        <div>
            <div>
            {
                user.user && user.type==='companyAdmin' ? (
                    <span>
                        <AdminHeader/>
                    </span>
                ) : (
                    <span>
                        <TeamHeader name="Team"/>
                    </span>
                )
            }
            <div className="card-panel">
                <div className="card-panel-centre">
                {
                    companyProfiles.status === 'success' && companyProfiles.data.data.data.map((profile) => <Card pageType="published" img={profile.attributes.profilePhoto.data.attributes.url} name={profile.attributes.name} date={profile.attributes.createdAt} status={profile.attributes.status}/>)
                }
                </div>
            </div>
            </div>
        </div>
    )
}
