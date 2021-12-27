import React from 'react'
import './Sidenav.css'
import { Link } from 'react-router-dom'

export const Sidenav = (props) => {
    return (
        <div className="side-menu-modal">
            <div className="side-menu-content">
            <i class="fa fa-2x fa-times close-icon" onClick={props.closeSideNav}></i>
                <div className="side-menu">
                    <Link to={'/'} className="menu-option">Login</Link>
                    <Link to={'/register'} className="menu-option">Register</Link>
                </div>
            </div>
        </div>
    )
}
