import { modalType } from "../reducers/modalReducer"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import WEB_URL from "../../misc/web_url"
import { getDistance } from "../../misc/getDistance"
import Geolocation from '@react-native-community/geolocation'
import store from ".."

export const OPEN_DATE_PICKER_MODAL = () => dispatch => {
    dispatch({
        type: modalType.OPEN_DATE_PICKER_MODAL
    })
}

export const CLOSE_DATE_PICKER_MODAL = () => dispatch => {
    dispatch({
        type: modalType.CLOSE_DATE_PICKER_MODAL
    })
}

export const OPEN_POST_MODAL = () => dispatch => {
    dispatch({
        type: modalType.OPEN_POST_MODAL
    })
}

export const CLOSE_POST_MODAL = () => dispatch => {
    dispatch({
        type: modalType.CLOSE_POST_MODAL
    })
}

export const OPEN_TIME_PICKER_MODAL = () => dispatch => {
    dispatch({
        type: modalType.OPEN_TIME_PICKER_MODAL
    })
}

export const CLOSE_TIME_PICKER_MODAL = () => dispatch => {
    dispatch({
        type: modalType.CLOSE_TIME_PICKER_MODAL
    })
}

export const OPEN_SELECT_TYPE_PICKER_MODAL = () => dispatch => {
    dispatch({
        type: modalType.OPEN_SELECT_TYPE_MODAL
    })
}

export const CLOSE_SELECT_TYPE_PICKER_MODAL = () => dispatch => {
    dispatch({
        type: modalType.CLOSE_SELECT_TYPE_MODAL
    })
}

export const OPEN_IMAGE_PICKER_MODAL = () => dispatch => {
    dispatch({
        type: modalType.OPEN_IMAGE_PICKER_MODAL
    })
}

export const CLOSE_IMAGE_PICKER_MODAL = () => dispatch => {
    dispatch({
        type: modalType.CLOSE_IMAGE_PICKER_MODAL
    })
}

export const OPEN_LOCATION_PICKER_MODAL = () => dispatch => {
    dispatch({
        type: modalType.OPEN_LOCATION_PICKER_MODAL
    })
}

export const CLOSE_LOCATION_PICKER_MODAL = () => dispatch => {
    dispatch({
        type: modalType.CLOSE_LOCATION_PICKER_MODAL
    })
}

export const OPEN_PRICE_INPUT_MODAL = (order_id) => dispatch => {
    dispatch({
        type: modalType.OPEN_PRICE_INPUT_MODAL,
        payload: {
            order_id: order_id
        }
    })
}

export const CLOSE_PRICE_INPUT_MODAL = () => dispatch => {
    dispatch({
        type: modalType.CLOSE_PRICE_INPUT_MODAL
    })
}

export const OPEN_DETAIL_MODAL = (order_id) => dispatch => {
    dispatch({
        type: modalType.OPEN_DETAIL_MODAL,
        payload: {
            order_id: order_id
        }
    })
}


export const CLOSE_DETAIL_MODAL = () => dispatch => {
    dispatch({
        type: modalType.CLOSE_DETAIL_MODAL
    })
}

export const OPEN_LOGOUT_CONFIRM_MODAL = () => dispatch => {
    dispatch({
        type: modalType.OPEN_LOGOUT_CONFIRM_MODAL
    })
}


export const CLOSE_LOGOUT_CONFIRM_MODAL = () => dispatch => {
    dispatch({
        type: modalType.CLOSE_LOGOUT_CONFIRM_MODAL
    })
}

export const getFormInfo = (order_id) => dispatch => {
    return new Promise ( (resolve , reject) => {
        AsyncStorage.getItem('token')
            .then(token => {
                axios({
                    url: WEB_URL,
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    },
                    data: {
                        query:
                            `
                        query{
                            getForm(formID :"${order_id}") {
                                _id
                                detail
                                date
                                techType
                                image
                                location{
                                    lat ,
                                    lon
                                }
                                userInfoID {
                                firstname
                                lastname
                                avatar
                                }
                            }
                        }
                        `
                    }
                }).then(res => {
                    let time = new Date(res.data.data.getForm.date)
                    time.setMinutes( time.getMinutes() - 7 * 60 )
                    getDistance(
                        store.getState().auth.userInfo.currentLocation.lat,
                        store.getState().auth.userInfo.currentLocation.lon,
                        res.data.data.getForm.location.lat,
                        res.data.data.getForm.location.lon
                    ).then( (dist) => {
                        dispatch({
                            type : modalType.SET_FORM_INFO,
                            payload :  {
                                ...res.data.data.getForm,
                                date : time,
                                distance : parseFloat(dist / 1000).toFixed(2)
                            }
                        })
                    })
                    
                    resolve(res.data.data.getForm)
                }).catch( err => {
                    reject(err)
                })
            })
    })
}

export const setFormInfo = (formInfo) => dispatch => {
    dispatch({
        type : modalType.SET_FORM_INFO ,
        payload : formInfo
    })
}

export const clearFormInfo = () => dispatch => {
    dispatch({
        type : modalType.SET_FORM_INFO,
        payload : {}
    })
}