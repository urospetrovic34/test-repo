import {LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT_SUCCESS,REGISTER_SUCCESS,REGISTER_FAIL,SET_PROFILE/*,USER_LOADED,USER_LOADING*/,SET_COMPANY_USER,SET_COMPANY_ADMIN,SET_COMPANY,SET_COMPANY_NAME} from '../actions/types'

const initialState = {
    user:null,
    token:localStorage.getItem('token'),
    type:null,
    company:null,
    companyName:null,
    profile:null
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token',action.payload.payload.jwt)
            return{
                ...state,
                user:action.payload.payload.user.id,
                token:localStorage.getItem('token')
            }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token')
            return initialState
        case SET_COMPANY_NAME:
            return{
                ...state,
                companyName:action.payload
            }
        case SET_COMPANY_USER:
            return{
                ...state,
                type:"companyUser"
            }
        case SET_COMPANY_ADMIN:
            return{
                ...state,
                type:"companyAdmin"
            }
        case SET_COMPANY:
            return{
                ...state,
                company:action.payload
            }
        case SET_PROFILE:
            return{
                ...state,
                profile:action.payload
            }
        default:
            console.log(state)
            return state;
    }
}

export default userReducer