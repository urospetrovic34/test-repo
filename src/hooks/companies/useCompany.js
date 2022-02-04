import {useQuery} from 'react-query'
import axiosConfig from '../../config/axiosConfig'
import { useSelector } from "react-redux";

export const getCompany = async (id) => {
    const response = await axiosConfig.get(`/companies/${id.queryKey[1]}?populate=*`)
    return response
}

export default function useCompany(){
    const user = useSelector((state) => state.user)
    const companyId = user?.company
    return useQuery(['company',companyId],getCompany,{enabled:!!companyId})
}