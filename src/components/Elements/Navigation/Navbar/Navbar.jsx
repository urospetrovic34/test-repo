import React, { useState/*,useEffect*/ } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css';
import { Sidenav } from '../Sidenav/Sidenav';
import navLogo from '../../../../assets/logo.png'
import { useDispatch, useSelector } from "react-redux";
import {logout} from '../../../../redux/actions/userActions'

export const Navbar = () => {

    const {user,type} = useSelector((state) => state.user)
    const dispatch = useDispatch();

    const [visibleSidenav, setVisibleSidenav] = useState(false)

    const handleSideNav = () => {
        visibleSidenav ? setVisibleSidenav(false) : setVisibleSidenav(true)
    }

    return (
        <div>
            <div className="nav">
                <div className="nav-logo">
                    <Link to="/">
                        <img src={navLogo} alt="navigation-logo" className="nav-logo-icon" />
                    </Link>
                </div>
                {user && 
                    <div className="nav-items">
                        <div className="nav-item">
                            <p className="nav-option" onClick={() => dispatch(logout())}>Logout</p>   
                        </div>
                    </div>
                }
                {!user && !type && 
                    <div className="nav-items">
                        <div className="nav-item">
                            <Link to="/login" className="nav-item-anchor">Login</Link>
                        </div>
                        <div className="nav-item">
                            <Link to="/register" className="nav-item-anchor">Register</Link>
                        </div>
                    </div>
                }
                <div className="nav-burger">
                    <i className="fa fa-2x fa-bars nav-burger-icon" onClick={handleSideNav} />
                </div>
            </div>
            {visibleSidenav ? <Sidenav handleSideNav={handleSideNav}/> : null}
        </div>
    )
}