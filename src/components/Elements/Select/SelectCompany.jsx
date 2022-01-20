import React, {useEffect} from 'react'
import useCompanies from '../../../hooks/useCompanies'
import './Select.css'
import { Link } from 'react-router-dom'
import { customStyles } from './customStyles'
import Select from 'react-select'

export const SelectCompany = (props) => {
    const companies = useCompanies()
    const companyOptions = []

    if(companies.status === 'success'){
        companies.data.data.data.map((company,index) => companyOptions.push({"value":company.id,"label":company.attributes.name}))
    }

    useEffect(()=>{
        console.log(companyOptions)
    })

    return (
        <div>
            {companies.status === 'loading' && (
                <div>
                    <Select isDisabled={true} className="custom-select" styles={customStyles}/>
                </div>
            )}
            {companies.status === 'success' && (
                <div>
                <Select defaultValue={companyOptions[0]} options={companyOptions} className="custom-select" styles={customStyles} onChange={props.handleCompanyChange}/>
                </div>
            )}
            <div className="small-text-right">
                <Link to="/" className="small-text-anchor">Add a company?</Link>
            </div>
        </div>
    )
}
