import {all,call} from 'redux-saga/effects'
import { userSagas } from './userSaga'

export default function* rootSaga() {
    yield all([call(userSagas)])
}