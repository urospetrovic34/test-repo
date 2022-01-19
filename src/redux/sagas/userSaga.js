import axiosConfig from '../../config/axiosConfig'
import axiosPublicConfig from '../../config/axiosPublicConfig'
import {all, call, put, takeLatest} from 'redux-saga/effects'
import {loginSuccess,loginFail,registerSuccess,registerFail} from '../actions/userActions'
import {LOGIN_USER,/*,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT_SUCCESS,REGISTER_SUCCESS,REGISTER_FAIL,USER_LOADED,USER_LOADING,*/ REGISTER_USER} from '../actions/types'
import {getErrors} from '../actions/errorActions'

const login = async (identifier,password) => {
    const response = await axiosPublicConfig.post('/auth/local',{
        identifier,
        password
    })
    return {payload: response.data}
}

const register = async (email,password,username) => {
    const response = await axiosPublicConfig.post('/auth/local/register',{
        email,
        password,
        username
    })
    return {payload: response.data}
}

const addProfilePicture = async (formData) => {
    const response = await axiosConfig.post('/upload',formData/*,{headers:{'Content-Type': 'multipart/form-data'}}*/)
    return {payload: response.data}
}

const createNewProfile = async (name,user,userRole,company,profilePhoto) => {
    const response = await axiosConfig.post('/profiles',{
          "data": {
            name,
            user,
            userRole,
            company,
            profilePhoto
          }
    })
    return {payload: response.data}
}

export function* loginWithCredentials({payload:{identifier,password}}){
    try {
        const user = yield login(identifier,password)
        console.log(user)
        yield put(loginSuccess(user))
    } catch (error) {
        yield put(getErrors(error.response.data.error.message,error.response.status,'LOGIN_FAIL'))
        yield put(loginFail(error))
    }
}

export function* registerWithCredentials({payload:{email,password,username,formData}}){
    console.log(formData)
    try {
        const user = yield register(email,password,username)
        yield put(registerSuccess(user))
        try {
            const image = yield addProfilePicture(formData)
            yield createNewProfile(username,user.payload.user.id,"company_user",5,image.payload[0].id)
        } catch (error) {
            console.log(error)        
        }
    } catch (error) {
        yield put(getErrors(error.response.data.error.message,error.response.status,'REGISTER_FAIL'))
        yield put(registerFail(error))
    }
}

export function* onLoginUser() {
    yield takeLatest(LOGIN_USER,loginWithCredentials)
}

export function* onRegisterUser() {
    yield takeLatest(REGISTER_USER,registerWithCredentials)
}

export function* userSagas(){
    yield all([
        call(onLoginUser),
        call(onRegisterUser)
    ])
}