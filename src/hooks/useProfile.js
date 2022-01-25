import {useQuery} from 'react-query'
import axiosConfig from '../config/axiosConfig'

export const getProfile = async (id) => {
    const response = await axiosConfig.get(`/profiles/${id}?populate=*`)
    return response
}

export default function useProfile(id){
    return useQuery(['profile',id],getProfile)
}