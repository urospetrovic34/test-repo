import React, {useEffect,useState,useRef} from 'react'
//import { Link } from 'react-router-dom'
import './Register.css'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../redux/actions/userActions'
//import { clearErrors } from '../../redux/actions/errorActions'
import { useNavigate } from "react-router-dom";
import {FileUpload} from '../Elements/FileUpload/FileUpload'
import {SelectCompany} from '../Elements/Select/SelectCompany'
import {SelectRole} from '../Elements/Select/SelectRole'

export const Register = () => {

    const [fileName,setFileName] = useState("Choose file")
    const user = useSelector((state) => state.user)
    const [credentials, setCredentials] = useState({ email: '', password: '', username:'',formData:null })

    const fileInput = useRef(null)

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleCredentialsChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    const handleRegisterSubmit = (event) => {
        event.preventDefault()
        dispatch(registerUser(credentials))
    }

    const handleFileClick = (event) => {
        event.preventDefault()
        fileInput.current.click()
    }

    const handleFileChange = (event) => {
        event.preventDefault()
        const fileUploaded = event.target.files[0]
        setFileName(fileUploaded.name)
        const formData = new FormData()
        formData.append('files',fileUploaded)
        setCredentials({ ...credentials,formData: formData})
    }

    useEffect(()=>{
        if(user.isAuthenticated)
        {
            navigate('/')
        }
    },[user,navigate])

    return (
        <div className="register-form-container">
            <p className="form-type">REGISTER</p>
            <form className="register-form">
                <label htmlFor="">Name</label>
                <input type="text" placeholder="Name" name="username" onChange={handleCredentialsChange}/>
                <label htmlFor="">Email</label>
                <input type="text" placeholder="Email" name="email" onChange={handleCredentialsChange}/>
                <label htmlFor="">Password</label>
                <input type="password" placeholder="Password" name="password" onChange={handleCredentialsChange}/>
                <label htmlFor="">Company</label>
                <SelectCompany/>
                <label htmlFor="">User role</label>
                <SelectRole/>
                <label htmlFor="">Image</label>
                <FileUpload fileName={fileName} fileInput={fileInput} handleFileClick={handleFileClick} handleFileChange={handleFileChange}/>
                <button className="submit-button" onClick={handleRegisterSubmit}>Submit</button>
            </form>
        </div>
    )
}