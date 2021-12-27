import React from 'react'
import { Link } from 'react-router-dom'
import './Register.css'

export const Register = () => {
    return (
        <div className="form-container">
            <div className="form">
                <p className="caption">uTeam - Register</p>
                <label>Name</label>
                <input type="text" placeholder="Name"/>
                <label>Email</label>
                <input type="text" placeholder="Email"/>
                <label>Password</label>
                <input type="password" placeholder="Password"/>
                {/* <div> */}
                <label>Profile Photo</label>
                <div className="upload">
                    {/* <input type="text" className="upload-input"/> */}
                    <p>Upload file</p>
                    <label className="upload-file">Choose File
                    <input type="file" />
                    </label>
                </div>
                {/* </div> */}
                <div className="row">
                    <Link to={'/'}>Already have an account?</Link>
                    <button>Register</button>
                </div>
            </div>
        </div>
    )
}