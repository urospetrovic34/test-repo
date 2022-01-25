import { useSelector } from 'react-redux'
import { Navigate } from "react-router-dom"

export const GuestRoute = ({children,redirect}) => {
    const {user,type} = useSelector((state) => state.user)
    return !user && !type ? children : <Navigate to={redirect}/>
}