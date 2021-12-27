import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'

export const Login = () => {
    return (
        <div className="form-container">
            <div className="form">
                <p className="caption">uTeam - Login</p>
                <label>Email</label>
                <input type="text" placeholder="Email"/>
                <label>Password</label>
                <input type="password" placeholder="Password"/>
                <div className="row">
                    <Link to={'/register'}>Don't have an account?</Link>
                    <button>Login</button>
                </div>
            </div>
        </div>
    )
}
