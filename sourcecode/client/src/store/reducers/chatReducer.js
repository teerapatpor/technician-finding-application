export const chatType = {}
chatType.ENTER_PRIVATE_CHAT = 'ENTER_PRIVATE_CHAT'
chatType.LEAVE_PRIVATE_CHAT = 'LEAVE_PRIVATE_CHAT'
chatType.APPEND_MESSAGE = 'APPEND_MESSAGE'
chatType.INITIAL_HISTORY_LIST = 'INITIAL_HISTORY_LIST'
chatType.SET_INTERLOCUTOR_ID = 'SET_INTERLOCUTOR_ID'
chatType.DISCONNECT = 'DISCONNECT'
chatType.CLEAR = 'CHAT_REDUCER_CLEAR'
chatType.SET_IMAGE_URL = 'SET_IMAGE_URL'
chatType.SET_BADGE = 'SET_BADGE'

const initialState = {
    interlocutor : {
        id:'',
        name:'',
        avatar : 'https://firebasestorage.googleapis.com/v0/b/technician-finding-imageupload.appspot.com/o/avatar%2Fnone-avatar.png?alt=media&token=e4080489-c04a-4ab7-ac8f-b7e1a5a32cd3'
    },
    messages : [],
    lists : [],
    cid:'',
    imageUrl : '',
    badge : 0
}

export default function chatReducer(state=initialState , action){
    switch (action.type) {
        case chatType.ENTER_PRIVATE_CHAT:
            return{
                ...state,
                interlocutor: action.payload.interlocutor,
                messages: action.payload.messages
            }
        case chatType.LEAVE_PRIVATE_CHAT:
            return{
                ...state,
                interlocutor : initialState.interlocutor,
                messages: initialState.messages
            }
        case chatType.APPEND_MESSAGE :
            return{
                ...state,
                messages: [...state.messages , action.payload]
            }
        case chatType.INITIAL_HISTORY_LIST:
            return{
                ...state,
                lists : action.payload.list
            }
        case chatType.SET_INTERLOCUTOR_ID:
            return{
                ...state,
                interlocutor:{
                    id : action.payload.id
                }
            }
        case chatType.DISCONNECT :
            return state = initialState
        case chatType.CLEAR:
            return state = initialState
        case chatType.SET_IMAGE_URL:
            return {
                ...state,
                imageUrl : action.payload.imageUrl
            }
        case chatType.SET_BADGE :
            return{
                ...state,
                badge : action.payload.badge
            }
        default:    
            return state
    }
}