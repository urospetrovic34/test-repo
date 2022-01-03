import React,{useRef,useState} from 'react'
import './FileUpload.css'

export const FileUpload = () => {

    const [fileName,setFileName] = useState("Choose file")

    const fileInput = useRef(null)

    const handleClick = (event) => {
        event.preventDefault()
        fileInput.current.click()
    }

    const handleFileChange = (event) => {
        event.preventDefault()
        const fileUploaded = event.target.files[0]
        setFileName(fileUploaded.name)
    }

    return (
        <div className="file-upload">
            <button className="file-upload-button" onClick={handleClick}>Choose</button>
            <input type="file" ref={fileInput} onChange={handleFileChange} className="file-upload-input"/>
            <label>{fileName}</label>
        </div>
    )
}
