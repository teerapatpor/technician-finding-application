import {createStore, applyMiddleware} from 'redux'
// import socketMiddleware from './socket'
import thunk from 'redux-thunk'
import reducers from './reducers'


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

export default createStoreWithMiddleware(reducers)