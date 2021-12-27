import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css';
import { Sidenav } from '../Sidenav/Sidenav';
import { useState } from 'react';

export const Navbar = () => {

    const [sideNav, setSideNav] = useState(false);

    function showSideNav() {
        setSideNav(true);
    }

    function closeSideNav() {
        setSideNav(false)
    }

    return (
        <nav>
            <div className="logo">
                <Link to={'/'}>Logo</Link>
            </div>
            
            <i class="fa fa-2x fa-bars side-menu-button" onClick={showSideNav} />
            {sideNav ? <Sidenav closeSideNav={closeSideNav}/> : null}
            
            <div className="page">
                <Link to={'/'}>Login</Link>
                <Link to={'/register'}>Register</Link>
            </div>
        </nav>
    )
}