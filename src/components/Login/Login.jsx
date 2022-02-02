/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import './Login.css'
//import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../redux/actions/userActions'
import { clearErrors } from '../../redux/actions/errorActions'
//import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
//import useAuthProfile from "../../hooks/useAuthProfile";
//import {setCompanyUser,setCompanyAdmin} from '../../redux/actions/userActions'

export const Login = () => {

    const dispatch = useDispatch()
    //const navigate = useNavigate();

    /*const authProfile = useAuthProfile();
    let authProfileCheck = false
    console.log(authProfile)

    if (authProfile.status === 'success') {
        console.log("USPEH")
        if(!authProfileCheck){
            authProfileCheck = true
        }
    }*/

    const user = useSelector((state) => state.user)
    console.log(user)
    const [credentials, setCredentials] = useState({ identifier: '', password: '' })
    const [errorMessages, setErrorMessages] = useState({
        "login": "",
        "identifier": "",
        "password": ""
    })

    const error = useSelector((state) => state.error)

    const handleCredentialsChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    const handleLoginSubmit = (event) => {
        event.preventDefault()
        dispatch(loginUser(credentials))
    }

    //OVO TRENUTNO NECE DA RADI ZBOG TOGA STO SE SADA VRACAJU
    //SAMO 500 GRESKE I.E. Internal Server Error
    //BEZ SPECIJALIZOVANIH PORUKA
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
    }, [error])

    useEffect(() => {
        dispatch(clearErrors())
        setErrorMessages({
            "login": "", "identifier": "",
            "password": ""
        })
    }, [dispatch])

    /*useEffect(() => {
        if(user.type === 'companyUser'){
            navigate('/')
        }
        else if(user.type === 'companyAdmin'){
            navigate('/admin')
        }
    },[user,navigate])*/

    /*useEffect(() =>{
        if(authProfileCheck){
            authProfile.data.data.data[0].attributes.userRole==='company_user' ? (dispatch(setCompanyUser())) : dispatch(setCompanyAdmin())
        }
    },[authProfileCheck])*/

    /*useEffect(() => {
        if (user.isAuthenticated && user.type==='companyUser') {
            navigate('/')
        }
        else if (user.isAuthenticated && user.type==='companyAdmin'){
            navigate('/admin')
        }
    }, [user, navigate])*/

    return (
        <div className="login-form-container">
            <p className="form-type">LOGIN <span>{errorMessages.login}</span></p>
            <form className="login-form">
                <label htmlFor="">Email <span>{errorMessages.identifier}</span></label>
                <input className={errorMessages.identifier ? "error-input" : ""} name="identifier" type="text" placeholder="Email" onChange={handleCredentialsChange} />
                <label htmlFor="">Password <span>{errorMessages.password}</span></label>
                <input className={errorMessages.password ? "error-input" : ""} name="password" type="password" placeholder="Password" onChange={handleCredentialsChange} />
                <button className="submit-button" onClick={handleLoginSubmit}>Login</button>
                <div className="small-text-right">
                    <Link to="/join" className="small-text-anchor">Don’t have an account?</Link>
                </div>
            </form>
        </div>
    )
}
