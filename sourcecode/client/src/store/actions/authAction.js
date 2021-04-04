import { authType } from "../reducers/authReducer"
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import WEB_URL from "../../misc/web_url"
import { notiType } from "../reducers/notificationReducer"
import { formType } from "../reducers/formReducer"
import { chatType } from "../reducers/chatReducer"
import { techType } from "../reducers/technicianReducer"
import { getDistance } from "../../misc/getDistance"
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import store from ".."
import { regType } from "../reducers/regReducer"
import { StatusBar } from 'react-native'
import { color } from "../../stylesheet/colors"


export const login = (username, password) => (dispatch) => {

    let json = []

    AsyncStorage.setItem('notification', JSON.stringify(json))

    dispatch({
        type: authType.LOADING
    })
    return new Promise((resolve, reject) => {
        axios({
            url: WEB_URL,
            method: "post",
            data: {
                query: `
                  query{
                    login(LOGIN:{username:"${username}"password:"${password}"}){
                        token
                        status
                    }
                  }
                    `,
            },
            headers: {
                "Content-Type": "application/json",
            },
        }).then((result) => {
            const data = result.data.data.login
            if (data.status) {
                AsyncStorage.setItem('token', `${data.token}`)
                    .then(() => {
                        resolve({ status: true })
                    }).catch((err) => {
                        reject(err)
                    })
            }
            else {
                resolve({ status: false })
                dispatch({
                    type: authType.LOGIN_FAIL
                })
                dispatch({
                    type: authType.LOADED
                })
            }
        });
    })
}

export const logout = () => (dispatch) => {
    AsyncStorage.removeItem('token')
    AsyncStorage.removeItem('notification')
    dispatch({
        type: authType.LOGOUT_SUCCESS
    })
    dispatch({
        type: authType.CLEAR
    })
    dispatch({
        type: notiType.CLEAR
    })
    dispatch({
        type: formType.CLEAR
    })
    dispatch({
        type: chatType.CLEAR
    })
    dispatch({
        type: techType.CLEAR
    })
    try {
        LoginManager.logOut()
    } catch (err) {
        console.log('logout err :', err);
    }
}

export const loginWithFacebook = () => dispatch => {
    let json = []
    AsyncStorage.setItem('notification', JSON.stringify(json))
    return new Promise((resolve, reject) => {
        LoginManager.logInWithPermissions(["public_profile"])
            .then((res) => {
                if (res.isCancelled) {
                    console.log("Login has cancelled");
                }
                else {
                    AccessToken.getCurrentAccessToken()
                        .then(data => {
                            const token = data.accessToken.toString()
                            fetch('https://graph.facebook.com/v2.5/me?fields=picture,name,first_name,last_name,friends&access_token=' + token)
                                .then(res => res.json())
                                .then(json => {
                                    axios({
                                        url: WEB_URL,
                                        method: 'post',
                                        data: {
                                            query: `
                                                query{
                                                    facebookLogin (facebookID : "${json.id}"){
                                                      token
                                                      status
                                                    }
                                                  }
                                                `,
                                        },
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                    }).then(result => {
                                        const data = result.data.data.facebookLogin
                                        if (data.status) {
                                            AsyncStorage.setItem('token', `${data.token}`)
                                                .then(() => {
                                                    resolve({ status: data.status })
                                                }).catch((err) => {
                                                    reject(err)
                                                })
                                        }
                                        else {
                                            Promise.all(
                                                store.dispatch({
                                                    type: regType.SET_FIRSTNAME,
                                                    payload: {
                                                        firstname: json.first_name
                                                    }
                                                }),
                                                store.dispatch({
                                                    type: regType.SET_LASTNAME,
                                                    payload: {
                                                        lastname: json.last_name
                                                    }
                                                }),
                                                store.dispatch({
                                                    type: regType.SET_IMAGE_PROFILE,
                                                    payload: {
                                                        avatar: {
                                                            path: json.picture.data.url,
                                                            type: 'url'
                                                        }
                                                    }
                                                }),
                                                store.dispatch({
                                                    type: regType.SET_USERNAME,
                                                    payload: {
                                                        username: `fb?${json.id}`
                                                    }
                                                })
                                            ).then(() => {
                                                resolve({ status: false })
                                            }).catch((err) => {
                                                reject(err)
                                            })
                                        }
                                    }).catch(err => {
                                        console.log('login with facebook error :', err);
                                    })
                                })
                        })
                }
            },
                (err) => {
                    reject(err)
                }
            )
    })
}

export const checkToken = () => async (dispatch) => {
    dispatch({
        type: authType.LOADING
    })
    const token = await AsyncStorage.getItem('token')
    axios({
        url: `${WEB_URL}`,
        method: "post",
        data: {
            query: `
            query{
                tokenCheck {
                  status
                  firstname
                  lastname
                  avatar
                  role
                  forms{
                      _id
                  }
                  userID
                  technicianInfoID {
                    newForm {
                      _id
                    } 
                    acceptForm {
                      _id
                    }
                  }
                }
              }
                    `,
        },
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
    }).then(res => {
        dispatch({
            type: authType.LOADED
        })
        const data = res.data.data.tokenCheck
        if (data.status) {
            if (data.role === 'technician') {
                dispatch({
                    type: notiType.SET_ORDER_BADGE,
                    payload: {
                        order_badge: data.technicianInfoID.newForm.length
                    }
                })
                dispatch({
                    type: authType.LOADED
                })
                dispatch({
                    type: authType.LOGIN_SUCCESS,
                    payload: {
                        firstname: data.firstname,
                        lastname: data.lastname,
                        role: data.role,
                        uid: data.userID,
                        avatar: data.avatar
                    }
                })
            } else {
                dispatch({
                    type: authType.LOADED
                })
                dispatch({
                    type: authType.LOGIN_SUCCESS,
                    payload: {
                        firstname: data.firstname,
                        lastname: data.lastname,
                        role: data.role,
                        uid: data.userID,
                        avatar: data.avatar
                    }
                })
                // Promise.all(
                //     data.forms.map(async (form) => {
                //         const distance = await getDistance(
                //             store.getState().auth.userInfo.currentLocation.lat,
                //             store.getState().auth.userInfo.currentLocation.lon,
                //             form.location.lat,
                //             form.location.lon
                //         )
                //         temp_list.push({
                //             ...form,
                //             distance: parseFloat(distance / 1000).toFixed(2)
                //         })
                //     })
                // ).then(() => {
                //     dispatch({
                //         type: notiType.SET_USER_RESPONSE,
                //         payload: temp_list
                //     })
                //     dispatch({
                //         type: authType.LOGIN_SUCCESS,
                //         payload: {
                //             firstname: data.firstname,
                //             lastname: data.lastname,
                //             role: data.role,
                //             uid: data.userID,
                //             avatar: data.avatar
                //         }
                //     })
                // }).catch(err => {
                //     console.log(err);
                // })

            }
        } else {
            dispatch({
                type: authType.LOGIN_FAIL
            })
            dispatch({
                type: authType.LOADED
            })
        }
    })
        .catch(err => {
            console.log('check token error : ', err);
            dispatch({
                type: authType.LOGIN_FAIL
            })
            dispatch({
                type: authType.LOADED
            })
        })
}

export const LOADING = () => dispatch => {
    dispatch({
        type: authType.LOADING
    })
}

export const LOADED = () => dispatch => {
    dispatch({
        type: authType.LOADED
    })
}


export const clear = () => (dispatch) => {
    dispatch({
        type: authType.CLEAR
    })
    dispatch({
        type: notiType.CLEAR
    })
    dispatch({
        type: formType.CLEAR
    })
    dispatch({
        type: chatType.CLEAR
    })
    dispatch({
        type: techType.CLEAR
    })
}


export const updateToken = () => dispatch => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('token')
            .then(token => {
                axios({
                    url: WEB_URL,
                    method: "post",
                    data: {
                        query: `
                            query{
                                updateToken {
                                    token
                                    userID
                                }
                            }
                        `,
                    },
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    },
                }).then(res => {
                    const data = res.data.data.updateToken
                    AsyncStorage.setItem('token', data.token)
                    resolve({ uid: data.userID })
                }).catch(err => {
                    reject(err)
                })
            })
    })
}

export const changeRole = (role) => dispatch => {
    dispatch({
        type: authType.SET_ROLE,
        payload: {
            role: role
        }
    })
}

export const setCurrentLocation = (lat, lon) => dispatch => {
    // console.log(lat, lon);
    dispatch({
        type: authType.SET_CURRENT_LOCATION,
        payload: {
            currentLocation: {
                lat: lat,
                lon: lon
            }
        }
    })
}



// query{
//     tokenCheck {
//       status
//       firstname
//       lastname
//       avatar
//       role
//       forms{
//           _id
//           detail
//           date 
//           location {
//               lat
//               lon
//           }
//           technician {
//             minPrice
//             maxPrice
//             location {
//             lat
//             lon
//             }
//             tech {
//               _id
//               star
//               count
//               userInfoID {
//                 userID
//                 firstname
//                 lastname
//                 avatar
//               }
//             }
//           }
//       }
//       userID
//       technicianInfoID {
//         newForm {
//           _id
//           detail
//           date
//           location {
//               lat 
//               lon
//           }
//           userInfoID {
//             firstname
//             lastname
//             avatar
//           }
//         } 
//         acceptForm {
//           _id
//           senderID
//           detail
//           date
//           userInfoID{

//               firstname 
//               lastname
//               avatar
//           }
//         }
//       }
//     }
//   }