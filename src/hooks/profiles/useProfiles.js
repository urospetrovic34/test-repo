import {useQuery} from 'react-query'
import axiosConfig from '../../config/axiosConfig'
import { useSelector } from "react-redux";

export const getProfiles = async (id) => {
    const response = await axiosConfig.get(`/profiles?filters[userRole][$eq]=company_user&filters[company][id][$eq]=${id.queryKey[1]}&populate=*&filters[status]=published`)
    return response
}

export default function useProfiles(){
    const user = useSelector((state) => state.user)
    const companyId = user?.company
    return useQuery(['profiles',companyId],getProfiles,{enabled:!!companyId})
}