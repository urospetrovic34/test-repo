import React from 'react'
import { customStyles } from './customStyles'
import Select from 'react-select'

export const SelectQuestionType = (props) => {
    return (
        <div>
            <Select defaultValue={props.defaultValue ? props.defaultValue : props.options[0]} className="custom-select" styles={customStyles} options={props.options} onChange={props.handleTypeChange}/>
        </div>
    )
}
