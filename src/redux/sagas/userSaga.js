import axios from 'axios'
import {all, call, put, takeLatest} from 'redux-saga/effects'
import {loginSuccess,loginFail,registerSuccess,registerFail} from '../actions/userActions'
import {LOGIN_USER,/*,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT_SUCCESS,REGISTER_SUCCESS,REGISTER_FAIL,USER_LOADED,USER_LOADING,*/ REGISTER_USER} from '../actions/types'
import {getErrors} from '../actions/errorActions'

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, error => {
    console.log(error)
})

const login = async (identifier,password) => {
    const response = await axios.post('https://internship-hr-app.herokuapp.com/api/auth/local',{
        identifier,
        password
    })
    return {payload: response.data}
}

const register = async (email,password,username) => {
    const response = await axios.post('https://internship-hr-app.herokuapp.com/api/auth/local/register',{
        email,
        password,
        username,
    })
    return {payload: response.data}
}

const createNewProfile = async (name,user,userRole,company) => {
    const response = await axios.post('https://internship-hr-app.herokuapp.com/api/profiles',{
          "data": {
            name,
            user,
            userRole,
            company
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

export function* registerWithCredentials({payload:{email,password,username}}){
    try {
        const user = yield register(email,password,username)
        console.log(user)
        yield put(registerSuccess(user))
        yield createNewProfile(username,user.payload.user.id,"company_user",5)
    } catch (error) {
        yield put(getErrors(error.response.data.error.message,error.response.status,'REGISTER_FAIL'))
        yield put(registerFail(error))
        console.log(error)
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