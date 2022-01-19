import {useQuery} from 'react-query'
import axiosPublicConfig from '../config/axiosPublicConfig'

export const getCompanies = async () => {
    const response = await axiosPublicConfig.get(`/companies`)
    return response
}

export default function useCompanies(){
    return useQuery('companies',getCompanies)
}