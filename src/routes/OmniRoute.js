import { useSelector } from 'react-redux'
import { Navigate } from "react-router-dom"

export const OmniRoute = () => {
    const {user,type} = useSelector((state) => state.user)
    return !user && !type ? <Navigate to='/login'/> : <Navigate to='/team'/>
}