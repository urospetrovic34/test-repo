import {useQuery} from 'react-query'
import axiosConfig from '../../config/axiosConfig'
import { useSelector } from "react-redux";

export const getPendingProfiles = async (id) => {
    const response = await axiosConfig.get(`/profiles?filters[userRole][$eq]=company_user&filters[company][id][$eq]=${id.queryKey[1]}&filters[status]=pending&populate=*`)
    return response
}

export default function usePendingProfiles(){
    const user = useSelector((state) => state.user)
    const companyId = user?.company
    return useQuery(['pendingprofiles',companyId],getPendingProfiles,{enabled:!!companyId})
}