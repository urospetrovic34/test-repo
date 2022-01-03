import React, {useEffect} from 'react'
import './Sidenav.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {logout} from '../../../../redux/actions/userActions'
import { useNavigate } from "react-router-dom";

export const Sidenav = (props) => {

    const user = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(user.isAuthenticated)
        {
            navigate('/')
        }
    },[user,navigate])


    return (
        <div className="side-nav">
            <div className="side-nav-exit">
                <i class="fa fa-3x fa-times side-nav-exit-icon" onClick={props.handleSideNav}/>
            </div>
                {user.isAuthenticated ? (
                    <div className="side-nav-items">
                        <div className="side-nav-item">
                            <p className="side-nav-option" onClick={() => dispatch(logout())}>Logout</p>   
                        </div>
                    </div>
                ) : (
                    <div className="side-nav-items">
                        <div className="side-nav-item">
                            <Link to="/login" className="side-nav-item-anchor" onClick={props.handleSideNav}>Login</Link>
                        </div>
                        <div className="side-nav-item">
                            <Link to="/register" className="side-nav-item-anchor" onClick={props.handleSideNav}>Register</Link>
                        </div>
                    </div>
                )}
        </div>
    )
}
