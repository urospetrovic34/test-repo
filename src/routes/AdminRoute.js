import { useSelector } from 'react-redux'
import { Navigate } from "react-router-dom"

export const AdminRoute = ({children,redirect,redirectUser}) => {
    const {user,type} = useSelector((state) => state.user)
    return user && type==='companyAdmin' ? children : user && type==='companyUser' ? <Navigate to={redirectUser}/> : <Navigate to={redirect}/>
}