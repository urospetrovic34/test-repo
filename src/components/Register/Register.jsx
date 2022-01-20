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
    const [credentials, setCredentials] = useState({ email: '', password: '', username:'',formData:null,userRole:'',company:'' })

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

    const handleRoleChange = (event) => {
        setCredentials({ ...credentials,userRole: event.value})
    }

    const handleCompanyChange = (event) => {
        setCredentials({ ...credentials,company: event.value})
    }

    const roleOptions = [
        {value:'company_user',label:'Company User'},
        {value:'company_admin',label:'Company Admin'}
    ]

    useEffect(()=>{
        console.log(credentials)
    })

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
                <SelectCompany handleCompanyChange={handleCompanyChange}/>
                <label htmlFor="" className="role-label">User role</label>
                <SelectRole options={roleOptions} handleRoleChange={handleRoleChange}/>
                <label htmlFor="">Image</label>
                <FileUpload fileName={fileName} fileInput={fileInput} handleFileClick={handleFileClick} handleFileChange={handleFileChange}/>
                <button className="submit-button" onClick={handleRegisterSubmit}>Register</button>
            </form>
        </div>
    )
}