import React from 'react'
import './FileUpload.css'

export const FileUpload = (props) => {
    return (
        <div className="file-upload">
            <button className="file-upload-button" onClick={props.handleFileClick}>Choose</button>
            <input type="file" ref={props.fileInput} onChange={props.handleFileChange} className="file-upload-input"/>
            <label>{props.fileName}</label>
        </div>
    )
}
