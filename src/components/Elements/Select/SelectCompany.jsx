import React from 'react'
import useCompanies from '../../../hooks/useCompanies'
import './Select.css'

export const SelectCompany = () => {
    const companies = useCompanies()

    return (
        <div>
        {companies.status === 'success' && (
            <div className="select">
                <select>
                    {companies.data.data.data.map((company,index) => (<option value={company.attributes.name} key={index}>{company.attributes.name}</option>))}
                </select>
            </div>
            )}
        </div>
    )
}
