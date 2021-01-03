import { combineReducers, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import ui from './reducers/ui'

const rootReducer = combineReducers({ ui })
const isDev = process.env.NODE_ENV === 'development'
const store = isDev ? createStore(rootReducer,applyMiddleware(logger)) : createStore(rootReducer)

export default store