import {useQuery} from 'react-query'
import axiosConfig from '../../config/axiosConfig'
import { useSelector } from "react-redux";

export const getAuthProfile = async (id) => {
    const response = await axiosConfig.get(`/profiles/${id.queryKey[1]}?populate=*`)
    return response
}

export default function useAuthProfile(){
    const user = useSelector((state) => state.user)
    const userId = user?.profile
    return useQuery(['authProfile',userId],getAuthProfile,{enabled:!!userId})
}