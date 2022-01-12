import {GET_ERRORS,CLEAR_ERRORS} from '../actions/types'

const initialState = {
    //MSG IS FOR ERROR MESSAGE
    msg:null,
    //STATUS IS FOR ERROR CODE
    status:null,
    //ID IS FOR ACTION TYPE
    id:null
}

const errorReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ERRORS:
            console.log(action.payload)
            return {
                msg:action.payload.msg,
                status:action.payload.status,
                id:action.payload.id
            }
        case CLEAR_ERRORS:
            return {
                msg:null,
                status:null,
                id:null
            }
        default:
            return state;
    }
}

export default errorReducer