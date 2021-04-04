import { userInfo } from "../../stylesheet"

export const authType = {}
authType.LOGIN_SUCCESS = 'LOGIN_SUCCESS'
authType.LOGIN_FAIL = 'LOGIN_FAIL'
authType.LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
authType.LOADING = 'AUTH_LOADING'
authType.LOADED = 'AUTH_LOADED'
authType.CLEAR = 'AUTH_REDUCER_CLEAR'
authType.SET_ROLE = 'SET_ROLE'
authType.SET_CURRENT_LOCATION = 'SET_CURRENT_LOCATION'


const initialState = {
    isLoading: false,
    isAuth: false,
    userInfo: {
        firstname: '',
        lastname: '',
        role: '',
        uid: '',
        avatar : '',
        currentLocation : {
            lat : 0,
            lon : 0
        }
    }
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case authType.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuth: true,
                userInfo: {
                    currentLocation : {
                        ...state.userInfo.currentLocation
                    },
                    ...action.payload
                }
            }
        case authType.LOGIN_FAIL:
            return {
                ...state,
                isLoading: false,
                isAuth: false
            }
        case authType.LOGOUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuth: false,
                userInfo: {
                    ...initialState.userInfo,
                    currentLocation : {
                        lat : state.userInfo.currentLocation.lat,
                        lon : state.userInfo.currentLocation.lon
                    }
                }
            }
        case authType.LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case authType.LOADED:
            return {
                ...state,
                isLoading: false,
            }
        case authType.CLEAR :
            return {
                ...initialState ,
                userInfo: {
                    ...initialState.userInfo,
                    currentLocation : {
                        lat : state.userInfo.currentLocation.lat,
                        lon : state.userInfo.currentLocation.lon
                    }
                }
            }
        case authType.SET_ROLE :
            return {
                ...state,
                userInfo : {
                    ...state.userInfo,
                    role : action.payload.role
                }
            }
        case authType.SET_CURRENT_LOCATION:
            return {
                ...state,
                userInfo : {
                    ...state.userInfo,
                    currentLocation : {
                        lat : action.payload.currentLocation.lat,
                        lon : action.payload.currentLocation.lon
                    }
                }
            }
        default:
            return state
    }
}