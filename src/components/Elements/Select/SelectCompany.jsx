import React from 'react'
import './Select.css'
import { Link } from 'react-router-dom'
import { customStyles } from './customStyles'
import Select from 'react-select'

export const SelectCompany = (props) => {
    return (
        <div>
            <div>
                <Select isDisabled={props.menuDisabled} isSearchable={true} defaultValue={props.options[0]} options={props.options} className="custom-select" styles={customStyles} onChange={props.handleCompanyChange} />
            </div>
            <div className="small-text-right">
                <Link to="#" className="small-text-anchor" onClick={props.handleNewCompany}>{props.textChange ? "Add a company" : "Select an existing company"}</Link>
            </div>
        </div>
    )
}
