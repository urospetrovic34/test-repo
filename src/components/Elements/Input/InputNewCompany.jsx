import React from 'react'
import './InputNewCompany.css'

export const InputNewCompany = (props) => {
    return (
        <div>
            <input className="input-new-company" type="text" placeholder="Enter Company Name" name="company_name" onChange={props.handleCompanyName}/>
        </div>
    )
}
