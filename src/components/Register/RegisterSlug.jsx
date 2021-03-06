/* eslint-disable react-hooks/exhaustive-deps */
//OVO IZNAD JE HTELO DA NAM KOMPROMITUJE CITAV TRUD
import React, { useEffect, useState, useRef } from 'react'
//import { Link } from 'react-router-dom'
import './Register.css'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../redux/actions/userActions'
//import { clearErrors } from '../../redux/actions/errorActions'
import { useNavigate } from "react-router-dom";
import { FileUpload } from '../Elements/FileUpload/FileUpload'
import { Link } from 'react-router-dom'
import useCompanies from '../../hooks/useCompanies'
import useAuthProfile from "../../hooks/useAuthProfile";
import { Spinner } from "../Elements/Spinner/Spinner";
//import {setCompanyUser,setCompanyAdmin} from '../../redux/actions/userActions'

export const RegisterSlug = () => {

    const authProfile = useAuthProfile();
    let authProfileCheck = false

    if (authProfile.status === 'success') {
        console.log("USPEH")
        if(!authProfileCheck){
            authProfileCheck = true
        }
    }

    const roleOptions = [
        { value: 'company_user', label: 'Company User' },
        { value: 'company_admin', label: 'Company Admin' }
    ]

    const companies = useCompanies()
    const companyOptions = []
    let companyCheck = false

    if (companies.status === 'success') {
        companies.data.data.data.map((company, index) => companyOptions.push({ "value": company.id, "label": company.attributes.name }))
        if(!companyCheck){
            companyCheck = true
        }
    }

    const [fileName, setFileName] = useState("Choose file")
    const user = useSelector((state) => state.user)
    const [credentials, setCredentials] = useState({ email: '', password: '', username: '', formData: null, userRole: roleOptions[0].value, company: window.location.pathname.split("/")[2],name:'',slug:'' })

    console.log(credentials)

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
        formData.append('files', fileUploaded)
        setCredentials({ ...credentials, formData: formData })
    }

    useEffect(() =>{
        if(companyCheck){
            setCredentials({ ...credentials,company:companyOptions[0].value})
        }
    },[companyCheck])

    useEffect(() =>{
        console.log(user)
    },[])

    useEffect(() => {
        if(user.user && user.type){
            navigate('/')
        }
    },[user,navigate])

    /*useEffect(() =>{
        if(authProfileCheck){
            console.log(user)
            console.log(authProfile)
        }
        //            authProfile.data.data.data[0].attributes.userRole==='company_user' ? (dispatch(setCompanyUser())) : dispatch(setCompanyAdmin())
    },[authProfileCheck])

    useEffect(() => {
        if (user.isAuthenticated && user.type==='companyUser') {
            navigate('/')
        }
        else if (user.isAuthenticated && user.type==='companyAdmin'){
            navigate('/admin')
        }
    }, [user, navigate])*/

    return (
        <div>
            {companies.status === 'loading' && (
    <div className="control-center">
      <Spinner />
    </div>
  )}
            {companies.status === 'success' && (
                <div className="register-form-container">
                    <p className="form-type">REGISTER</p>
                    <form className="register-form">
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder="Name" name="username" onChange={handleCredentialsChange} />
                        <label htmlFor="">Email</label>
                        <input type="text" placeholder="Email" name="email" onChange={handleCredentialsChange} />
                        <label htmlFor="">Password</label>
                        <input type="password" placeholder="Password" name="password" onChange={handleCredentialsChange} />
                        <label htmlFor="">Image</label>
                        <FileUpload fileName={fileName} fileInput={fileInput} handleFileClick={handleFileClick} handleFileChange={handleFileChange} />
                        <button className="submit-button" onClick={handleRegisterSubmit}>Register</button>
                        <div className="small-text-right">
                            <Link to="/login" className="small-text-anchor">Already have an account?</Link>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}