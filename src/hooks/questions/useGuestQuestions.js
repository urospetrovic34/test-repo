import {useQuery} from 'react-query'
import axiosConfig from '../../config/axiosConfig'

export const getGuestQuestions = async (id) => {
    const response = await axiosConfig.get(`/questions?filters[company][id][$eq]=${window.location.pathname.split("/")[2]}&sort=order:asc&populate[answers][populate]=*`)
    return response
}

export default function useGuestQuestions(){
    return useQuery(['guestQuestions'],getGuestQuestions)
}