import React, {useEffect,useState} from 'react'
//import { Link } from 'react-router-dom'
import './Register.css'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../redux/actions/userActions'
//import { clearErrors } from '../../redux/actions/errorActions'
import { useNavigate } from "react-router-dom";

export const Register = () => {

    const user = useSelector((state) => state.user)
    const [credentials, setCredentials] = useState({ email: '', password: '', username:'' })

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleCredentialsChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    const handleRegisterSubmit = (event) => {
        event.preventDefault()
        dispatch(registerUser(credentials))
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
                <button className="submit-button" onClick={handleRegisterSubmit}>Submit</button>
            </form>
        </div>
    )
}