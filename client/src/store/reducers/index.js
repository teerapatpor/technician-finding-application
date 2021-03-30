import {combineReducers} from 'redux'

import counterReducer from './counterReducer'
import authReducer from './authReducer'
import regReducer from './regReducer'
import socketReducer from './socketReducer'
import modalReducer from './modalReducer'
import chatReducer from './chatReducer'
import formReducer from './formReducer'
import technicianReducer from './technicianReducer'
import notificationReducer from './notificationReducer'

export default combineReducers({
    counter : counterReducer,
    auth : authReducer,
    reg : regReducer,
    socket : socketReducer,
    modal : modalReducer,
    chat : chatReducer,
    form : formReducer,
    tech : technicianReducer,
    noti : notificationReducer,
})