import React from 'react'
import './Select.css'
import Select from 'react-select'
import {customStyles} from './customStyles'

export const SelectRole = (props) => {
    return (
        <div>
            <Select defaultValue={props.options[0]} className="custom-select" styles={customStyles} options={props.options} onChange={props.handleRoleChange}/>
        </div>
    )
}
