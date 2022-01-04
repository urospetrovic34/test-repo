import {createStore,/*,compose,*/ applyMiddleware} from 'redux';
import rootReducer from './reducers'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootSaga from './sagas/rootSaga'
import createSagaMiddleware from 'redux-saga'

const initialState = {}

const persistConfig = {
    key:'root',
    storage:storage
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware]

const store = createStore(persistedReducer,initialState,applyMiddleware(...middleware))

sagaMiddleware.run(rootSaga)

export default store