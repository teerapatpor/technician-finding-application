export const socketType = {}
socketType.SEND_MESSAGE = 'SEND_MESSAGE'
socketType.CONNECT = 'CONNECT'
socketType.DISCONNECT = 'DISCONNECT'

initialState = { 
    socket_id : ''
}

export default function socketReducer (state = initialState , action) {
    switch (action.type) {
        case socketType.SEND_MESSAGE:
            return{
                ...state,
                socket_id : action.payload.socket_id
            }
        case socketType.CONNECT:
            return{
                ...state,
                socket_id : action.payload.socket_id
            }
        case socketType.DISCONNECT:
            return state = initialState
        default:
            return state
    }
}