import io from 'socket.io-client'
import firebase from '@react-native-firebase/storage'
import { SOCKET_URL } from '../../misc/web_url'
import { socketType } from '../reducers/socketReducer'
import store from '../'
import { notiType } from '../reducers/notificationReducer'
import { authType } from '../reducers/authReducer'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import PushNotification from 'react-native-push-notification'



export const socket = io.connect(`${SOCKET_URL}`,{
    reconnectionDelay : 1000,
    query : {
        uid : store.getState().auth.userInfo.uid
    },
    reconnection : true,
    
})

socket.on('join', (id) => {
    // console.log('join', id);
})

socket.on('reconnect' , () => {
    const uid = store.getState().auth.userInfo.uid
    socket.emit('join', { uid })
})

socket.on('confirm_technician_response', (data) => {
    AsyncStorage.getItem('notification').then((str) => {
        let noti = JSON.parse(str)
        const new_noti_json = [{
            id: data.formID,
            type: '',
            name: '',
            status: false,
            page: 'accepted'
        }, ...noti]

        const notRead = new_noti_json.filter((val) => {
            return val.status === false
        })
        store.dispatch({
            type: notiType.SET_NOTIFICATION_BADGE,
            payload: {
                notification_badge: notRead.length
            }
        })
        AsyncStorage.setItem('notification', JSON.stringify(new_noti_json))
    })
})

// socket.on('update_user_response', () => {
//     updateUserResponse()
// })

// socket.on('update_tech_order', () => {
//     updateTechOrder()
// })

socket.on('recieve_new_response', (data) => {
    AsyncStorage.getItem('notification').then((str) => {
        let noti = JSON.parse(str)
        const new_noti_json = [{
            id: data.result._id,
            type: data.result.techType,
            name: data.tech.firstname + ' ' + data.tech.lastname,
            status: false,
            page: 'userNotification'
        }, ...noti]

        const notRead = new_noti_json.filter((val) => {
            return val.status === false
        })
        store.dispatch({
            type: notiType.SET_NOTIFICATION_BADGE,
            payload: {
                notification_badge: notRead.length
            }
        })
        AsyncStorage.setItem('notification', JSON.stringify(new_noti_json))
    })
})

socket.on('confirm_send_post_req', () => {
    store.dispatch({
        type: authType.LOADED
    })
})

socket.on('recieve_new_post_req', ({ form }) => {
    // console.log('recieve new post req', form);
    PushNotification.localNotification({
        title: form.userInfoID.firstname + ' ' + form.userInfoID.lastname,
        message: 'รายละเอียดงาน : ' + form.detail,
    })
    AsyncStorage.getItem('notification').then((str) => {
        let noti = JSON.parse(str)

        const new_noti_json = [{
            id: form._id,
            type: form.techType,
            name: form.userInfoID.firstname + ' ' + form.userInfoID.lastname,
            status: false,
            page: 'techNotification'
        }, ...noti]

        const notRead = new_noti_json.filter((val) => {
            return val.status === false
        })

        store.dispatch({
            type: notiType.SET_NOTIFICATION_BADGE,
            payload: {
                notification_badge: notRead.length
            }
        })

        AsyncStorage.setItem('notification', JSON.stringify(new_noti_json))
    })
})

socket.on('receive_message', ({ message }) => {
    // const uid = store.getState().auth.userInfo.uid
    const interlocuter = store.getState().chat.interlocutor

    // alert(message.message)
    PushNotification.localNotification({
        title: 'คุณได้รับข้อความใหม่',
        message: message.msgType === 'text' ? message.message : message.msgType === 'image' ? `test : ได้ส่งรูปภาพ` : 'คุณได้รับข้อความใหม่'
    })
    // else {
    //     store.dispatch({
    //         type: chatType.APPEND_MESSAGE,
    //         payload: {
    //             date: message.date,
    //             message: message.message,
    //             sender: message.sender,
    //             msgType: message.msgType
    //         }
    //     })
    // }
})

socket.on('send_message_response', ({ message }) => {

})

export const sendMessage = (message, receiver) => dispatch => {
    socket.emit('send_message', { message, receiver })
    // console.log(message , receiver);
}

export const leave = (uid) => dispatch => {
    // console.log('leave :', uid);
    socket.emit('leave', { uid })
    dispatch({
        type: socketType.DISCONNECT
    })
}


export const connection = (uid) => dispatch => {
    socket.emit('join', { uid })
    dispatch({
        type: socketType.CONNECT,
        payload: {
            socket_id: '1234'
        }
    })
}

export const disconnect = (uid) => dispatch => {
    // console.log('disconnect ', uid);
    socket.disconnect(uid)
    // socket.emit('leave', { uid })
    // socket.disconnect()
    dispatch({
        type: socketType.DISCONNECT
    })
}

export const sendPostReq = ({ name, uid, date, type, file, detail, location }) => dispatch => {
    var image = []
    return new Promise((resovle, reject) => {
        Promise.all(file.map(async (item) => {
            const reference = firebase().ref('post').child(`${item.creationDate}-${item.filename}`)
            await reference.putFile(item.path)
            await reference.getDownloadURL().then(url => {
                image.push(url)
            })
        })).then(() => {
            socket.emit('send_post_req', {
                senderID: uid,
                date: date,
                techType: type,
                image: image,
                detail: detail,
                location: location
            })
            resovle()
        }).catch(() => {
            reject()
        })
    })

}

export const acceptedReq = (res) => dispatch => {
    const firstname = store.getState().auth.userInfo.firstname
    const lastname = store.getState().auth.userInfo.lastname
    socket.emit('accepted_req', {
        data: {
            formID: res._id,
            technician: {
                maxPrice: res.maxPrice,
                minPrice: res.minPrice,
                tech: res.uid,
            }
        },
        tech: {
            firstname: firstname,
            lastname: lastname
        }
    })
}

export const cancelRequest = (formID) => dispatch => {
    socket.emit('cancel_request', { formID })
}

export const confirmTechnician = (formID, tid) => dispatch => {
    const uid = store.getState().auth.userInfo.uid
    socket.emit('confirm_technician', {
        formID: formID,
        userID: uid,
        techID: tid
    })
}