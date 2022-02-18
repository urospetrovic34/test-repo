import React from 'react'
import './Select.css'
import { customStyles } from './customStyles'
import Select from 'react-select'

export const SelectGuestSort = (props) => {
    return (
        <div>
            <Select defaultValue={props.options[0]} className="custom-select" styles={customStyles} options={props.options} onChange={props.handleStatusChange}/>
        </div>
    )
}