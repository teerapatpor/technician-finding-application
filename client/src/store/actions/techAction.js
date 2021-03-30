import { techType } from "../reducers/technicianReducer"
import axios from 'axios'
import WEB_URL from "../../misc/web_url"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { authType } from "../reducers/authReducer"
import store from '../'

export const SET_SEARCH_KEY_WORD = (keyword) => dispatch => {
    dispatch({
        type: techType.SET_SEARCH_KEY_WORD,
        payload: {
            keyword: keyword
        }
    })
}

export const SEARCH_BY_KEY_WORD = (keyword) => dispatch => {
    // dispatch({
    //     type: authType.LOADING
    // })
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('token').then(token => {
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
                            searchTechnician(word:"${keyword}") {
                            technician {
                              star
                              _id
                              count
                              userID
                              userInfoID {
                                firstname
                                lastname
                                avatar
                                technicianInfoID
                                }   
                            address{
                                lat
                                lon
                            }
                            }
                            } 
                        }
                    `
                }
            }).then(res => {
                resolve(res.data.data.searchTechnician.technician)
            })
        })
    })
}

export const GET_TECHNICIAN_INFO = (tid) => dispatch => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('token').then(token => {
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
                            getTechnicianInfo( userID :"${tid}") {
                              onSite
                              frontStore
                              star
                              amount
                              description
                              bio
                              count
                              address{
                                  lat
                                  lon
                              }
                              userInfoID {
                                firstname
                                lastname
                                userID
                                avatar
                                role
                                phone
                                technicianInfoID
                              }
                              aptitude {
                                aptitude
                                star
                                amountOfvoteStar
                                amountOfcomment
                                comment {
                                    userID
                                    comment
                                    userInfoID {
                                        avatar
                                        firstname
                                        lastname
                                    }
                                }
                              }
                              workDay
                                workTime{
                                    start{
                                        hour
                                        minutes
                                    }
                                    end{
                                        hour
                                        minutes
                                    }
                                }
                            }
                          }
                    `
                }
            }).then(res => {
                const data = res.data.data.getTechnicianInfo
                Promise.all(
                    data.aptitude.map((item) => {
                        return {
                            key: item.aptitude,
                            data: item
                        }
                    })
                ).then((aptitude) => {
                    dispatch({
                        type: techType.SET_TECHNICIAN_INFO,
                        payload: {
                            aptitude: aptitude,
                            personalInfo: data.userInfoID,
                            onSite: data.onSite,
                            frontStore: data.frontStore,
                            bio: data.bio,
                            description: data.description,
                            star: data.star,
                            location: data.address,
                            workDay: data.workDay,
                            workTime: data.workTime,
                            comment: data.comment
                        }
                    })
                    resolve()
                }).catch(() => reject())

            }).catch(err => {
                console.log('get technician info error :', err);
                reject()
            })
        })
    })
}

export const SET_TID = (tid) => dispatch => {
    dispatch({
        type: techType.SET_TID,
        payload: {
            tid: tid
        }
    })
}

export const GET_NEAR_TECHNICIAN = (lat, lon) => dispatch => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('token').then(token => {
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
                        getNearTechnician(ADDRESS: {
                          address : {
                            lat : ${lat},
                            lon : ${lon}
                          }
                        }) {
                          technician {
                            _id
                            onSite
                            star
                            description
                            userInfoID {
                                firstname
                                lastname
                                avatar
                                userID
                            }
                            address {
                              lat
                              lon
                            }
                          }
                        }
                      }
                    `
                }
            }).then(res => {
                resolve(res.data.data.getNearTechnician.technician)
            }).catch(err => {
                reject(err)
            })
        })
    })
}

export const SEARCH_GUIDE = (keyword) => dispatch => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('token').then(token => {
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
                    wordGuide(word:"${keyword}")
                }
                `
                }
            }).then(res => {
                resolve(res.data.data.wordGuide)
            }).catch(err => {
                reject(err)
            })
        })
    })
}

export const technicianRegister = (info) => dispatch => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('token').then(token => {
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
                        mutation{
                            createTechnicianInfo(
                                INFORMATION : {
                                    aptitude : [${ info.aptitude.map(item => ('"' + item + '"'))}],
                                    frontStore : ${info.frontStore},
                                    onSite : ${info.onSite},
                                    address : {
                                        lat : ${info.address.lat},
                                        lon : ${info.address.lon}
                                    },
                                    description : "${info.description}",
                                    bio : "${info.bio}" ,
                                    workTime : {
                                        start :{
                                            hour : ${info.workTime.start.hour},
                                            minutes : ${info.workTime.start.minutes}
                                        },end :{
                                            hour : ${info.workTime.end.hour},
                                            minutes : ${info.workTime.end.minutes}
                                        }
                                    },
                                    workDay : [${info.workDay}]
                                }
                            ) {
                              _id
                            }
                        }
                `
                }
            }).then(res => {
                resolve(res.data.data.createTechnicianInfo)
            }).catch(err => {
                reject(err)
            })
        })
    })
}


export const clear = () => disptach => {
    disptach({
        type: techType.CLEAR
    })
}

export const searchTechnicianByType = (aptitude) => dispatch => {
    const current_location = store.getState().auth.userInfo.currentLocation
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('token').then(token => {
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
                        findbyType(
                            aptitude : "${aptitude}"
                            lat : ${current_location.lat}
                            lon : ${current_location.lon}
                        ) {
                          technician {
                            _id
                            onSite
                            star
                            description
                            userInfoID {
                                firstname
                                lastname
                                avatar
                                userID
                            }
                            address {
                              lat
                              lon
                            }
                          }
                        }
                      }
                    `
                }
            }).then(res => {
                resolve(res.data.data.findbyType.technician)
            }).catch(err => {
                reject(err)
            })
        })
    })
}

export const voting = (type , star , tid) => dispatch => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('token').then(token => {
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
                        mutation{
                            userVote(
                            userID : "${tid}"
                            aptitude :"${type}"
                            voteStar : ${star}
                          ) {
                              status
                              star
                            }
                        }
                `
                }
            }).then( (res) => {
                resolve(res.data.data.userVote)
            }).catch( err => {
                console.log('vote err : ' , err);
                reject(false)
            })
        })
    })
}

export const comment = (type , comment , tid) => dispatch => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('token').then(token => {
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
                        mutation{
                            userComment(
                            userID : "${tid}"
                            aptitude :"${type}"
                            comment : "${comment}"
                          ) {
                              status
                            }
                        }
                `
                }
            }).then( (res) => {
                resolve(res.data.data.userComment.status)
            }).catch( err => {
                console.log('comment err : ' , err);
                reject(false)
            })
        })
    })
}