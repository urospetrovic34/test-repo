import {useQuery} from 'react-query'
import axiosConfig from '../../config/axiosConfig'

export const getGuestCompany = async () => {
    const response = await axiosConfig.get(`/companies/${window.location.pathname.split("/")[2]}?populate=*`)
    return response
}

export default function useGuestCompany(){
    return useQuery(['companies'],getGuestCompany)
}