import React, { useEffect } from 'react'

import ChatBubble from '../Chat/ChatBubble'
import { connect } from 'react-redux'
import { ENTER_PRIVATE_CHAT , LEAVE_PRIVATE_CHAT  , setImageUrl} from '../../store/actions/chatAction'

const mapStateToProps = (state) => ({
    uid: state.auth.userInfo.uid,
    tid: state.chat.interlocutor.id,
    messages: state.chat.messages,
})

const connector = connect(mapStateToProps, { setImageUrl , ENTER_PRIVATE_CHAT , LEAVE_PRIVATE_CHAT} )

const ChatBox = (props) => {


    // useEffect( () => {
    //     props.ENTER_PRIVATE_CHAT(props.uid , props.tid)
    //     .then( () => {

    //     })
    //     return () => {
    //         props.LEAVE_PRIVATE_CHAT()
    //     }
    // },[])

    return (
        <>
            {
                props.messages !== undefined ? (
                    <>
                        {
                            props.messages.map((item, index) => {
                                var isFirst = false
                                var isLast = false
                                var isNewDate = false
                                var time = new Date(item.date)

                                if (index === 0) {
                                    isFirst = true
                                    isNewDate = true
                                    if (index < props.messages.length - 1) {
                                        if (props.messages[index].sender !== props.messages[index + 1].sender) {
                                            isLast = true
                                        } else {
                                            isLast = false
                                        }
                                    } else {
                                        isLast = true
                                    }
                                } else if (index < props.messages.length - 1) {
                                    if (props.messages[index].sender !== props.messages[index + 1].sender) {
                                        isLast = true
                                    } else {
                                        isLast = false
                                    }
                                    if (props.messages[index].sender !== props.messages[index - 1].sender) {
                                        isFirst = true
                                    } else {
                                        isFirst = false
                                    }

                                    if (props.messages[index].date.split('T')[0] !== props.messages[index - 1].date.split('T')[0]) {
                                        isNewDate = true
                                    } else {
                                        isNewDate = false
                                    }
                                } else {
                                    isLast = true
                                    if (props.messages[index].sender !== props.messages[index - 1].sender) {
                                        isFirst = true
                                    } else {
                                        isFirst = false
                                    }

                                    if (props.messages[index].date.split('T')[0] !== props.messages[index - 1].date.split('T')[0]) {
                                        isNewDate = true
                                    } else {
                                        isNewDate = false
                                    }
                                }
                                return <ChatBubble
                                    key={index}
                                    text={item.message}
                                    sender={item.sender === props.uid}
                                    name={item.name}
                                    time={time}
                                    isFirst={isFirst}
                                    isLast={isLast}
                                    isNewDate={isNewDate}
                                    type={item.msgType}
                                    setImageIsOpen={() => props.setImageIsOpen()}
                                    setImageUrl = { (url) => props.setImageUrl(url)}
                                />
                            })
                        }
                    </>
                ) : null
            }

        </>

    )
}

export default connector(ChatBox)