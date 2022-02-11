import React, { useState, useEffect } from 'react';
import './Company.css'
import { TeamHeader } from '../Elements/TeamHeader/TeamHeader';
import { FileUpload } from '../Elements/FileUpload/FileUpload';
import useCompany from '../../hooks/companies/useCompany'
import profile from '../../assets/profile-placeholder.png'

export const Company = () => {

    const [updatedCompany, setUpdatedCompany] = useState({ name: '', slug: '', logo: null })

    const company = useCompany()
    let companyCheck = false
    console.log(company)

    const image = company.status === 'success' && company.data.data.data.attributes.logo.data ? company.data.data.data.attributes.logo.data.attributes.url : profile

    if (company.status === 'success') {
        if (!companyCheck) {
            companyCheck = true
        }
    }

    const handleCompanyNameChange = (event) => {
        setUpdatedCompany({ ...updatedCompany, name: event.target.value, slug: event.target.value.replace(/\s+/g, '').toLowerCase() })
    }

    useEffect(() => {
        if (companyCheck) {
            setUpdatedCompany({ ...updatedCompany, name: company.data.data.data.attributes.name, slug: company.data.data.data.attributes.slug })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [companyCheck])

    return <div>
        <span>
            <TeamHeader name="Company Info" />
        </span>
        <form className="company-form">
            <label htmlFor="">Company name</label>
            <input value={updatedCompany.name} type="text" placeholder="Enter company name" name="company-name" onChange={handleCompanyNameChange} />
            <label htmlFor="">Image</label>
            <div className="company-form-row-one">
                <div>
                    <img className="company-logo" src={image} alt="#" />
                </div>
                <div className="company-form-row-one-column-two">
                    <FileUpload className="company-width" />
                </div>
            </div>
            <button className="submit-button">Save</button>
        </form>
    </div>
};
