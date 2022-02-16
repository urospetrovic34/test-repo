import {useQuery} from 'react-query'
import axiosConfig from '../../config/axiosConfig'
import { useSelector } from "react-redux";

export const getCompanyQuestions = async (id) => {
    const response = await axiosConfig.get(`/questions?filters[company][id][$eq]=${id.queryKey[1]}&sort=order:asc&populate[answers][populate]=*`)
    return response
}

export default function useCompanyQuestions(){
    const user = useSelector((state) => state.user)
    const companyId = user?.company
    return useQuery(['companyQuestions',companyId],getCompanyQuestions,{enabled:!!companyId})
}