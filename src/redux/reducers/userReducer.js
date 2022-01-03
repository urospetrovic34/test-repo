import {LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT_SUCCESS,REGISTER_SUCCESS,REGISTER_FAIL,USER_LOADED,USER_LOADING} from '../actions/types'

const initialState = {
    user:null,
    isAuthenticated:null,
    token:localStorage.getItem('token')
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token',action.payload.payload.jwt)
            return{
                ...state,
                isAuthenticated:true,
                user:action.payload.payload.user,
                token:localStorage.getItem('token')
            }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token')
            return initialState
        default:
            return state;
    }
}

export default userReducer