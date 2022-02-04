import axiosConfig from '../../config/axiosConfig'
import axiosPublicConfig from '../../config/axiosPublicConfig'
import {all, call, put, takeLatest} from 'redux-saga/effects'
import {loginSuccess,loginFail,registerSuccess,registerFail,setCompanyUser,setCompanyAdmin,setCompany} from '../actions/userActions'
import {LOGIN_USER,/*,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT_SUCCESS,REGISTER_SUCCESS,REGISTER_FAIL,USER_LOADED,USER_LOADING,*/ REGISTER_USER} from '../actions/types'
import {getErrors} from '../actions/errorActions'
//import {useSelector} from 'react-redux'

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

const getAuthProfile = async (id) => {
    const response = await axiosConfig.get(`/profiles?filters[user][id][$eq]=${id}&populate=*`)
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
        try {
            const authProfile = yield getAuthProfile(user.payload.user.id)
            yield put(setCompany(authProfile.payload.data[0].attributes.company.data.id))
            if(authProfile.payload.data[0].attributes.userRole==='company_user'){
                yield put(setCompanyUser())
            }
            else if(authProfile.payload.data[0].attributes.userRole==='company_admin'){
                yield put(setCompanyAdmin())
            }
        } catch (error) {
            console.log(error)     
        }
    } catch (error) {
        yield put(getErrors(error.response.data.error.message,error.response.status,'LOGIN_FAIL'))
        yield put(loginFail(error))
    }
}

export function* registerWithCredentials({payload:{email,password,username,formData,userRole,company}}){
    try {
        const user = yield register(email,password,username)
        yield put(registerSuccess(user))
        try {
            //OVDE MORA CALL DA IDE, U SUPROTNOM NECE DA RADI
            const image = yield call(addProfilePicture,formData)
            yield createNewProfile(username,user.payload.user.id,userRole,company,image.payload[0].id)
            try {
                const authProfile = yield getAuthProfile(user.payload.user.id)
                yield put(setCompany(authProfile.payload.data[0].attributes.company.data.id))
                console.log(authProfile)
                if(authProfile.payload.data[0].attributes.userRole==='company_user'){
                    yield put(setCompanyUser())
                }
                else if(authProfile.payload.data[0].attributes.userRole==='company_admin'){
                    yield put(setCompanyAdmin())
                }
            } catch (error) {
                console.log(error)     
            }
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