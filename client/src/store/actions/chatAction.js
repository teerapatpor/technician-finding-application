import {chatType} from '../reducers/chatReducer';
import axios from 'axios';
import WEB_URL from '../../misc/web_url';
import store from '../';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GET_INTERLOCUTOR_INFO = (id) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('token').then((token) => {
      axios({
        url: `${WEB_URL}`,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        data: {
          query: `
                    query{
                        getUserInfo(userID :"${id}") {
                          userID
                          firstname
                          lastname
                          avatar
                          technicianInfoID
                        }
                      }
                    `,
        },
      })
        .then((res) => {
          resolve(res.data.data.getUserInfo);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

export const ENTER_PRIVATE_CHAT = (uid, tid) => (dispatch) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('token').then((token) => {
      axios({
        url: `${WEB_URL}`,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        data: {
          query: `
              query{
                  getChatInformation(
                      technicianID : "${tid}"
                      userID : "${uid}"
                  ) {
                      technicianID
                      technicianName
                      userName
                      technicianAvatar
                      userAvatar
                      history {
                          sender
                          message
                          date
                          msgType
                      }
                  }
              }
              `,
        },
      })
        .then((res) => {
          // console.log('chat enter ' , res.data.data.getChatInformation);
          const uid = store.getState().auth.userInfo.uid;
          const data = res.data.data.getChatInformation;
          if (res.data.data.getChatInformation.history !== null) {
            Promise.all(
              dispatch({
                type: chatType.ENTER_PRIVATE_CHAT,
                payload: {
                  interlocutor: {
                    id: tid,
                    name:
                      data.technicianID !== uid
                        ? data.technicianName
                        : data.userName,
                    avatar:
                      data.technicianID !== uid
                        ? data.technicianAvatar
                        : data.userAvatar,
                  },
                  messages: res.data.data.getChatInformation.history,
                },
              }),
            )
              .then(() => {
                resolve({status: true});
              })
              .catch(() => {
                reject({status: false});
              });
          } else {
            Promise.all(
              GET_INTERLOCUTOR_INFO(tid)
                .then((info) => {
                  dispatch({
                    type: chatType.ENTER_PRIVATE_CHAT,
                    payload: {
                      interlocutor: {
                        id: info.userID,
                        name: `${info.firstname} ${info.lastname}`,
                        avatar: info.avatar,
                      },
                      messages: [],
                    },
                  });
                })
                .catch((err) => {
                  console.log(err);
                }),
            );
            dispatch({
              type: chatType.ENTER_PRIVATE_CHAT,
              payload: {
                interlocutor: {
                  id: tid,
                  name:
                    data.technicianID !== uid
                      ? data.technicianName
                      : data.userName,
                  avatar:
                    data.technicianID !== uid
                      ? data.technicianAvatar
                      : data.userAvatar,
                },
                messages: [],
              },
            });
            resolve({status: false});
          }
        })
        .catch((err) => {
          reject('Error :', err);
        });
    });
  });
};

export const ENTER_PRIVATE_CHAT_BY_ID = (chatID) => (dispatch) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('token').then((token) => {
      axios({
        url: `${WEB_URL}`,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        data: {
          query: `
                query{
                    getChatInformationByID
                    (chatID:"${chatID}") {
                        technicianID
                        technicianName
                        userName
                        userID
                        technicianAvatar
                        userAvatar
                        history {
                            sender
                            message
                            date
                            msgType
                        }
                    }
                }
            `,
        },
      })
        .then((res) => {
          // console.log('chat enter ' , res.data.data.getChatInformation);
          const uid = store.getState().auth.userInfo.uid;
          const data = res.data.data.getChatInformationByID;
          dispatch({
            type: chatType.ENTER_PRIVATE_CHAT,
            payload: {
              interlocutor: {
                id: uid === data.userID ? data.technicianID : data.userID,
                name:
                  data.technicianID !== uid
                    ? data.technicianName
                    : data.userName,
                avatar:
                  data.technicianID !== uid
                    ? data.technicianAvatar
                    : data.userAvatar,
              },
              messages: data.history,
            },
          });
          resolve({status: true});
        })
        .catch((err) => {
          reject('Error :', err);
        });
    });
  });
};

export const LEAVE_PRIVATE_CHAT = () => (dispatch) => {
  dispatch({
    type: chatType.LEAVE_PRIVATE_CHAT,
  });
};

export const SET_INTERLOCUTOR_ID = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: chatType.SET_INTERLOCUTOR_ID,
      payload: {
        id: id,
      },
    });
    resolve();
  });
};

export const INITIAL_HISTORY_LIST = (uid) => (dispatch) => {
  // dispatch({
  //     type: authType.LOADING
  // })
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('token').then((token) => {
      axios({
        url: `${WEB_URL}`,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        data: {
          query: `
                        query{
                            getChatRoom(
                                userID : "${uid}"
                            ) {
                              _id
                              userID
                              userName
                              userFirstname
                              technicianID
                              technicianFirstname
                              technicianName
                              technicianAvatar
                              userReadStatus
                              technicianReadStatus
                              userAvatar
                                recentMessage {
                                  sender
                                  message
                                  date
                                  msgType
                                }
                            }
                        
                        }
                        `,
        },
      })
        .then((res) => {
          dispatch({
            type: chatType.INITIAL_HISTORY_LIST,
            payload: {
              list: res.data.data.getChatRoom.sort((a, b) => {
                return (
                  new Date(b.recentMessage.date).getTime() -
                  new Date(a.recentMessage.date).getTime()
                );
              }),
            },
          });
          resolve(res.data.data.getChatRoom);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

export const SEND_MESSAGE = (msg, type, uid) => (dispatch) => {
  dispatch({
    type: chatType.APPEND_MESSAGE,
    payload: {
      date: new Date().toISOString(),
      message: msg,
      sender: uid,
      msgType: type,
    },
  });
};

export const RECEIVE_MESSAGE = (message) => (dispatch) => {
  dispatch({
    type: chatType.APPEND_MESSAGE,
    payload: {
      date: message.date,
      message: message.message,
      sender: message.sender,
      msgType: message.msgType,
    },
  });
};

export const clear = () => (dispatch) => {
  dispatch({
    type: chatType.CLEAR,
  });
};

export const createChatroom = (uid, tid) => (dispatch) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('token').then((token) => {
      axios({
        url: `${WEB_URL}`,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        data: {
          query: `
                            mutation{
                                createChatRoom(
                                  INFORMATION : {
                                    technicianID : "${tid}"
                                    userID : "${uid}"
                                  }
                                )
                              }
                        `,
        },
      })
        .then((res) => {
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  });
};

export const setImageUrl = (imageUrl) => (dispatch) => {
  dispatch({
    type: chatType.SET_IMAGE_URL,
    payload: {
      imageUrl,
    },
  });
};

export const unMountMessageScreen = () => (dispatch) => {
  dispatch({
    type: chatType.INITIAL_HISTORY_LIST,
    payload: {
      list: [],
    },
  });
};
