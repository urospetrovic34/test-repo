import React from 'react'
//import { Link } from 'react-router-dom'
import {FileUpload} from '../Elements/FileUpload/FileUpload'
import './Register.css'

export const Register = () => {
    return (
        <div className="register-form-container">
            <p className="form-type">REGISTER</p>
            <form className="register-form">
                <label htmlFor="">Name</label>
                <input type="text" placeholder="Name"/>
                <label htmlFor="">Email</label>
                <input type="text" placeholder="Email"/>
                <label htmlFor="">Password</label>
                <input type="password" placeholder="Password"/>
                <label htmlFor="">Profile photo</label>
                <FileUpload/>
                <button className="submit-button">Submit</button>
            </form>
        </div>
    )
}