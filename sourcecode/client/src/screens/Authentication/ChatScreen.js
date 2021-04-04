import React, { useState, useRef, useEffect } from 'react'

import { View, Text, SafeAreaView, Keyboard, KeyboardAvoidingView, Image, Dimensions, Platform } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import ChatHeader from '../../components/Chat/ChatHeader'
import ChatInput from '../../components/Chat/ChatInput'
import ChatBox from '../../components/Chat/ChatBox'

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { color, content, widthToDp, heightToDp } from '../../stylesheet'
import { connect } from 'react-redux'
import { SEND_MESSAGE, LEAVE_PRIVATE_CHAT, clear, RECEIVE_MESSAGE } from '../../store/actions/chatAction'

import Modal from 'react-native-modalbox'
import { socket , connection } from '../../store/actions/socketAction'
import { useFocusEffect } from '@react-navigation/native'


const mapStateToProps = (state) => ({
    cid: state.chat.cid,
    uid: state.auth.userInfo.uid,
    messages: state.chat.messages,
    imageUrl: state.chat.imageUrl
})

const connector = connect(mapStateToProps, { RECEIVE_MESSAGE, clear, SEND_MESSAGE, LEAVE_PRIVATE_CHAT , connection })

const Chat = (props) => {

    const [imageIsOpen, setImageIsOpen] = React.useState(false)
    const scrollView_ref = useRef()


    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow)
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide)
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
            props.LEAVE_PRIVATE_CHAT()
        }
    }, [])

    const _keyboardDidShow = () => {
        scrollView_ref.current.scrollToEnd({ animated: true })
    }

    const _keyboardDidHide = () => {
        scrollView_ref.current.scrollToEnd({ animated: true })
    }

    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
            >

                <SafeAreaView style={content.topsafearray} />
                <SafeAreaView style={content.safearray}>
                    <ChatHeader navigation={props.navigation} />
                    {/* {
                        props.messages.length !== 0 ? (
                            <ScrollView
                                ref={scrollView_ref}
                                onContentSizeChange={() => {
                                    scrollView_ref.current.scrollToEnd({ animated: true })
                                }}
                            >
                                <ChatBox />
                            </ScrollView>
                        )
                            :
                            (
                                <>
                                    <View
                                        style={{
                                            flex : 1,
                                            justifyContent : 'center',
                                            alignItems : 'center'
                                        }}
                                    >
                                        
                                    </View>
                                </>
                            )
                    } */}
                    <ScrollView
                        style={{
                            backgroundColor: '#fff'
                        }}
                        ref={scrollView_ref}
                        onContentSizeChange={() => {
                            scrollView_ref.current.scrollToEnd({ animated: true })
                        }}
                    >
                        <ChatBox setImageIsOpen={() => setImageIsOpen(true)} />
                    </ScrollView>
                    <ChatInput />
                </SafeAreaView>
                <SafeAreaView
                    style={{
                        flex: 0,
                        backgroundColor: color.GREY_5
                    }}
                />
            </KeyboardAvoidingView>
            <Modal
                isOpen={imageIsOpen}
                onClosed={() => setImageIsOpen(false)}
                backdropPressToClose={true}
                style={{
                    backgroundColor: 'transparent',
                }}
            >
                <SafeAreaView
                    style={{
                        flex: 1
                    }}
                >
                    {/* source={{ uri: props.imageUrl }} */}

                    <View
                        style={{
                            flex: 1
                        }}
                    >
                        <View
                            style={{
                                position: 'relative',
                                height: widthToDp(7),
                                width: widthToDp('100')
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    zIndex: 2,
                                    alignSelf: 'flex-end',
                                    marginRight: widthToDp('7')
                                }}
                                onPress={() => {
                                    setImageIsOpen(false)
                                }}
                            >
                                <Feather name='x' size={widthToDp('7')} />
                            </TouchableOpacity>
                        </View>
                        <Image
                            source={{ uri: props.imageUrl }}
                            style={{
                                flex: 1
                            }}
                            resizeMethod='auto'
                            resizeMode='contain'
                        />

                    </View>
                </SafeAreaView>
            </Modal>
        </>
    )
}

export default connector(Chat)