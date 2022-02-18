import {useQuery} from 'react-query'
import axiosConfig from '../../config/axiosConfig'

export const getGuestAnswers = async (id) => {
    const response = await axiosConfig.get(`/answers?populate=*&filters[profile][id][$eq]=${id}`)
    return response
}

export default function useGuestAnswers(id){
    return useQuery(['answers',id],() => getGuestAnswers(id))
}