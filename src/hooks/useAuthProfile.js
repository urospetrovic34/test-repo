import {useQuery} from 'react-query'
import axiosConfig from '../config/axiosConfig'
import { useSelector } from "react-redux";

export const getAuthProfile = async (id) => {
    const response = await axiosConfig.get(`/profiles?filters[user][id][$eq]=${id.queryKey[1]}`)
    return response
}

export default function useProfile(){
    const user = useSelector((state) => state.user)
    const userId = user.user?.id
    return useQuery(['authProfile',userId],getAuthProfile,{enabled:!!userId})
}