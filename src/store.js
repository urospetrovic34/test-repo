import {createStore,compose} from 'redux';
import rootReducer from './reducers'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const initialState = {}

const persistConfig = {
    key:'root',
    storage:storage
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

//REDUX SAGA TO BE INCLUDED INSTEAD OF THUNK

const store = createStore(persistedReducer,initialState,compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

export default store