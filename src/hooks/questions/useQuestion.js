import {useQuery} from 'react-query'
import axiosConfig from '../../config/axiosConfig'

export const getQuestion = async (id) => {
    const response = await axiosConfig.get(`/questions?filters[id][$eq]=${id.queryKey[1]}&populate=*`)
    return response
}

export default function useQuestion(){
    return useQuery(['question',window.location.pathname.split('/')[2]],getQuestion)
}