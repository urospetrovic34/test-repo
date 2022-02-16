import React from 'react'
import './FileUpload.css'

export const FileUpload = (props) => {
    return (
        <div className="file-upload">
            <button className={`file-upload-button ${props.wider && 'wider'}  ${props.widerHundert && 'wider-hundert'}`} onClick={props.handleFileClick}>Choose</button>
            <input type="file" ref={props.fileInput} onChange={props.handleFileChange} className="file-upload-input" accept="image/*"/>
            <label>{props.fileName}</label>
        </div>
    )
}
