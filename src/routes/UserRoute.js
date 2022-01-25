import { useSelector } from 'react-redux'
import { Navigate } from "react-router-dom"

export const UserRoute = ({children,redirect}) => {
    const {user} = useSelector((state) => state.user)
    return user ? children : <Navigate to={redirect}/>
}