import axios from 'axios'

import { regType } from "../reducers/regReducer"
import WEB_URL from '../../misc/web_url'
import storage from '@react-native-firebase/storage'
import AsyncStorage from '@react-native-async-storage/async-storage'


export const setUsernamePassword = (username, password) => dispatch => {
    dispatch({
        type: regType.SET_USERNAME_PASSWORD,
        payload: {
            username: username,
            password: password
        }
    })
}

export const setUsername = (username) => dispatch => {
    dispatch({
        type: regType.SET_USERNAME,
        payload: {
            username: username
        }
    })
}

export const setPassword = (password) => dispatch => {
    dispatch({
        type: regType.SET_PASSWORD,
        payload: {
            password: password
        }
    })
}

export const setFirstname = (firstname) => dispatch => {
    dispatch({
        type: regType.SET_FIRSTNAME,
        payload: {
            firstname: firstname
        }
    })
}

export const setLastname = (lastname) => dispatch => {
    dispatch({
        type: regType.SET_LASTNAME,
        payload: {
            lastname: lastname
        }
    })
}

export const setRole = (role) => dispatch => {
    dispatch({
        type: regType.SET_ROLE,
        payload: {
            role: role
        }
    })
}

export const setPhoneNumber = (phone_number) => dispatch => {
    dispatch({
        type: regType.SET_PHONE,
        payload: {
            phone: phone_number
        }
    })
}

export const clear = () => dispatch => {
    dispatch({
        type: regType.CLEAR
    })
}

export const SET_IMAGE_PROFILE = (image, type) => dispatch => {
    return new Promise((resovle, reject) => {
        dispatch({
            type: regType.SET_IMAGE_PROFILE,
            payload: {
                avatar: {
                    path: image,
                    type: type
                }
            }
        })
        resovle()
    })
}

export const registor_success = (info) => async dispatch => {
    return new Promise(async (resovle, reject) => {
        if (info.avatar.type === 'url') {
            axios({
                url: WEB_URL,
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    query: `
                mutation{
                    register(
                        REGISTER:{
                            username : "${info.username}"
                            password : "${info.password}"
                            firstname : "${info.firstname}"
                            lastname : "${info.lastname}"
                            phone : "${info.phone}"
                            role : "user"
                            avatar : "${info.avatar.path}"
                    }){
                        status
                        token
                    }
                  }
                `
                }
            }).then(res => {
                if (res.data.data.register.status) {
                    AsyncStorage.setItem('token', res.data.data.register.token).then(() => {
                        dispatch({
                            type : regType.CLEAR
                        })
                        resovle()
                    })
                } else {
                    reject()
                }
            })
        }
        else {
            if (info.avatar_status) {
                const storage_ref = storage().ref('avatar').child(`${info.username}`)
                await storage_ref.putFile(info.avatar.path)
                await storage_ref.getDownloadURL().then(url => {
                    axios({
                        url: WEB_URL,
                        method: "post",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        data: {
                            query: `
                        mutation{
                            register(
                                REGISTER:{
                                    username : "${info.username}"
                                    password : "${info.password}"
                                    firstname : "${info.firstname}"
                                    lastname : "${info.lastname}"
                                    phone : "${info.phone}"
                                    role : "user"
                                    avatar : "${url}"
                            }){
                                status
                                token
                            }
                          }
                        `
                        }
                    }).then(res => {
                        if (res.data.data.register.status) {
                            AsyncStorage.setItem('token', res.data.data.register.token).then(() => {
                                dispatch({
                                    type : regType.CLEAR
                                })
                                resovle()
                            })
                        } else {
                            reject()
                        }
                    }).catch(err => {
                        console.log('registor error :', err);
                    })
                })
            }
            else {
                axios({
                    url: WEB_URL,
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: {
                        query: `
                    mutation{
                        register(
                            REGISTER:{
                                username : "${info.username}"
                                password : "${info.password}"
                                firstname : "${info.firstname}"
                                lastname : "${info.lastname}"
                                phone : "${info.phone}"
                                role : "user"
                                avatar : "https://firebasestorage.googleapis.com/v0/b/technician-finding-imageupload.appspot.com/o/avatar%2Fnone-avatar.png?alt=media&token=e4080489-c04a-4ab7-ac8f-b7e1a5a32cd3"
                        }){
                            status
                            token
                        }
                      }
                    `
                    }
                }).then(res => {
                    if (res.data.data.register.status) {
                        AsyncStorage.setItem('token', res.data.data.register.token)
                        .then(() => {
                            dispatch({
                                type : regType.CLEAR
                            })
                            resovle()
                        })
                    } else {
                        reject()
                    }
                })
            }
        }
    })
}

