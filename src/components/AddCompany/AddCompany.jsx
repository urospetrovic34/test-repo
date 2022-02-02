import React from 'react'
import './AddCompany.css'

export const AddCompany = () => {

    const handleCompanySubmit = () => {

    }

    return (
        <div className="company-form-container">
            <p className="form-type">ADD COMPANY</p>
            <form className="company-form">
                <label htmlFor="">Company name</label>
                <input name="name" type="text" placeholder="Name"/>
                <button className="submit-button" onChange={handleCompanySubmit}>Submit</button>
            </form>
        </div>
    )
}
