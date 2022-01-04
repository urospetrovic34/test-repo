import axios from 'axios'
import {all, call, put, takeLatest} from 'redux-saga/effects'
import {loginSuccess,loginFail,registerSuccess/*,registerFail*/} from '../actions/userActions'
import {LOGIN_USER,/*,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT_SUCCESS,REGISTER_SUCCESS,REGISTER_FAIL,USER_LOADED,USER_LOADING,*/ REGISTER_USER} from '../actions/types'
import {getErrors} from '../actions/errorActions'

const login = async (identifier,password) => {
    const response = await axios.post('https://internship-hr-app.herokuapp.com/api/auth/local',{
        identifier,
        password
    })
    return {payload: response.data}
}

const register = async (email,password) => {
    const response = await axios.post('https://internship-hr-app.herokuapp.com/api/auth/local/register',{
        email,
        password
    })
    return {payload: response.data}
}

/*const createNewProfile = async (name) => {
    const response = await axios.post('https://internship-hr-app.herokuapp.com/api/profiles',{
        name
    })
    return {payload: response.data}
}*/

export function* loginWithCredentials({payload:{identifier,password}}){
    try {
        const user = yield login(identifier,password)
        yield put(loginSuccess(user))
    } catch (error) {
        yield put(getErrors(error.response.data.error.message,error.response.status,'LOGIN_FAIL'))
        yield put(loginFail(error))
    }
}

export function* registerWithCredentials({payload:{email,password}}){
    try {
        const user = yield register(email,password)
        yield put(registerSuccess(user))
    } catch (error) {
        yield put(getErrors(error.response.data.error.message,error.response.status,'REGISTER_FAIL'))
        yield put(loginFail(error))
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