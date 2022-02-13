import {LOGIN_USER,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT_SUCCESS,REGISTER_USER,REGISTER_SUCCESS,REGISTER_FAIL,SET_PROFILE/*,USER_LOADED,USER_LOADING*/,SET_COMPANY_USER,SET_COMPANY_ADMIN,SET_COMPANY,SET_COMPANY_NAME} from './types'

export const loginUser = (credentials) => ({
    type:LOGIN_USER,
    payload:credentials
})

export const loginSuccess = (user) => ({
    type:LOGIN_SUCCESS,
    payload:user
})

export const loginFail = (error) => ({
    type:LOGIN_FAIL,
    payload:error
})

export const logout = () => ({
    type:LOGOUT_SUCCESS
})

export const registerUser = (credentials) => ({
    type:REGISTER_USER,
    payload:(credentials)
})

export const registerSuccess = (user) => ({
    type:REGISTER_SUCCESS,
    payload:user
})

export const registerFail = (error) => ({
    type:REGISTER_FAIL,
    payload:error
})

export const setCompany = (id) => ({
    type:SET_COMPANY,
    payload:id
})

export const setCompanyName = (id) => ({
    type:SET_COMPANY_NAME,
    payload:id
})

export const setCompanyUser = () => ({
    type:SET_COMPANY_USER
})

export const setCompanyAdmin = () => ({
    type:SET_COMPANY_ADMIN
})

export const setProfile = (id) => ({
    type:SET_PROFILE,
    payload:id
})