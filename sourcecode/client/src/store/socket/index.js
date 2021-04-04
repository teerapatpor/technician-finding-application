import createSocketMiddleware from 'redux-socket.io'
import io from 'socket.io-client'
import WEB_URL from '../../misc/web_url'

let socket = io()
let socketMiddleware = createSocketMiddleware(socket , 'ws/')

export default socketMiddleware