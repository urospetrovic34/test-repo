import {LOGIN_USER,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT_SUCCESS,REGISTER_USER,REGISTER_SUCCESS,REGISTER_FAIL/*,USER_LOADED,USER_LOADING*/} from './types'

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
    payload:credentials
})

export const registerSuccess = (user) => ({
    type:REGISTER_SUCCESS,
    payload:user
})

export const registerFail = (error) => ({
    type:REGISTER_FAIL,
    payload:error
})