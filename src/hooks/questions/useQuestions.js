import {useQuery} from 'react-query'
import axiosConfig from '../../config/axiosConfig'

export const getQuestions = async () => {
    const response = await axiosConfig.get(`/questions?populate=*&pagination[pageSize]=1000`)
    return response
}

export default function useQuestions(){
    return useQuery(['questions'],getQuestions)
}