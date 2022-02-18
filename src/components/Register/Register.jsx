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
import { SelectCompany } from '../Elements/Select/SelectCompany'
import { SelectRole } from '../Elements/Select/SelectRole'
import { Link } from 'react-router-dom'
import useCompanies from '../../hooks/useCompanies'
import useAuthProfile from "../../hooks/useAuthProfile";
import { InputNewCompany } from '../Elements/Input/InputNewCompany';
import { Spinner } from "../Elements/Spinner/Spinner";
//import {setCompanyUser,setCompanyAdmin} from '../../redux/actions/userActions'

export const Register = () => {

    const authProfile = useAuthProfile();
    let authProfileCheck = false

    const [newCompanyOpen, setNewCompanyOpen] = useState(false);
    const [menuDisabled, setMenuDisabled] = useState(false);
    const [textChange, setTextChange] = useState(true)

    const [nameCheck, setNameCheck] = useState(false);
    const [imageCheck, setImageCheck] = useState(false);

    if (authProfile.status === 'success') {
        console.log("USPEH")
        if(!authProfileCheck){
            authProfileCheck = true
        }
    }
    const [errorMessages, setErrorMessages] = useState({
        "login": "",
        "identifier": "",
        "password": ""
    })

    const error = useSelector((state) => state.error)

    const roleOptions = [
        { value: 'company_user', label: 'Company User' },
        { value: 'company_admin', label: 'Company Admin' }
    ]

    const companies = useCompanies()
    const companyOptions = []
    let companyCheck = false

    if (companies.status === 'success') {
        companies.data.data.data?.map((company, index) => companyOptions.push({ "value": company.id, "label": company.attributes.name }))
        if(!companyCheck){
            companyCheck = true
        }
    }

    const [fileName, setFileName] = useState("Choose file")
    const user = useSelector((state) => state.user)
    const [credentials, setCredentials] = useState({ email: '', password: '', username: '', formData: null, userRole: roleOptions[0].value, company: '',name:'',slug:'' })

    console.log(credentials)

    const fileInput = useRef(null)

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleCredentialsChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    const handleRegisterSubmit = (event) => {
        event.preventDefault()
        if(!credentials.username){
            setNameCheck(true)
        }
        else{
            setNameCheck(false)
        }
        if(!credentials.formData){
            setImageCheck(true)
        }
        if(!credentials.username && !credentials.email && !credentials.password && !credentials.formData){
            alert("NEUSPESNO")
        }
        else{
            dispatch(registerUser(credentials))
        }
    }

    useEffect(() => {
        if (error.msg === "2 errors occurred") {
            setErrorMessages({ "login": "", "identifier": " - Email is a required field", "password": " - Password is a required field" })
        }
        else if (error.msg === "password is a required field") {
            setErrorMessages({ "login": "", "identifier": "", "password": " - Password is a required field" })
        }
        else if (error.msg === "identifier is a required field") {
            setErrorMessages({ "login": "", "identifier": " - Email is a required field", "password": "" })
        }
        else if (error.msg === "Invalid identifier or password") {
            setErrorMessages({ "login": " - Invalid credentials", "identifier": "", "password": "" })
        }
        console.log(errorMessages)
    }, [error])

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

    const handleRoleChange = (event) => {
        setCredentials({ ...credentials, userRole: event.value })
    }

    const handleCompanyChange = (event) => {
        setCredentials({ ...credentials, company: event.value })
    }

    const handleCompanyName = (event) => {
        setCredentials({ ...credentials, name: event.target.value, slug: event.target.value.replace(/\s+/g, '').toLowerCase()})
    }

    const handleNewCompany = () => {
        setNewCompanyOpen(true)
        setMenuDisabled(true)
        setTextChange(false)
        setCredentials({ ...credentials,company: ''})
        if (newCompanyOpen) {
            setNewCompanyOpen(false)
            setMenuDisabled(false)
            setTextChange(true)
            setCredentials({ ...credentials, name:'', slug:''})
        }
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
                        <label htmlFor="">Name <span>{nameCheck && " - No name entered"}</span></label>
                        <input type="text" placeholder="Name" name="username" onChange={handleCredentialsChange} />
                        <label htmlFor="">Email</label>
                        <input type="text" placeholder="Email" name="email" onChange={handleCredentialsChange} />
                        <label htmlFor="">Password</label>
                        <input type="password" placeholder="Password" name="password" onChange={handleCredentialsChange} />
                        <label htmlFor="">Company</label>
                        <SelectCompany options={companyOptions} handleCompanyChange={handleCompanyChange} handleNewCompany={handleNewCompany} menuDisabled={menuDisabled} textChange={textChange}/>
                        {/*OVDE IDE TAJ NOVI DEO */}
                        {newCompanyOpen && <InputNewCompany handleCompanyName={handleCompanyName}/>}
                        {/*OVDE IDE TAJ NOVI DEO */}
                        <label htmlFor="" className="role-label">User role</label>
                        <SelectRole options={roleOptions} handleRoleChange={handleRoleChange} />
                        <label htmlFor="">Image <span>{imageCheck && " - No image sent"}</span></label>
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