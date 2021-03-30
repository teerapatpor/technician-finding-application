import React, { useState } from 'react'

import { Animated, Easing, TextInput, View, TouchableOpacity, Text , Platform } from 'react-native'

import { message, color, widthToDp } from '../../stylesheet'

import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { SEND_MESSAGE, createChatroom } from '../../store/actions/chatAction'
import { sendMessage } from '../../store/actions/socketAction'

import { connect } from 'react-redux'

import ImagePicker from 'react-native-image-crop-picker'

import firebaseStorage from '@react-native-firebase/storage'

import LinearGradient from 'react-native-linear-gradient'


const mapStateToProps = (state) => ({
    uid: state.auth.userInfo.uid,
    interlocutor: state.chat.interlocutor,
    messages: state.chat.messages
})

const ChatInput = (props) => {

    const [opacity, setOpacity] = useState(new Animated.Value(0));

    const translateX = opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    })

    const translateY = opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    })

    const animate = () => {
        Animated.spring(opacity, {
            toValue: 1,
            delay: 0,
            useNativeDriver: true,
            easing: Easing.elastic(4)
        }).start();
    };

    const animateOut = () => {
        Animated.spring(
            opacity, {
            toValue: 0,
            delay: 100,
            useNativeDriver: true,
            easing: Easing.bounce
        }
        ).start()
    }

    const [msg, setMsg] = useState('')

    const handleSendMessage = () => {
        if (props.messages.length === 0) {
            props.createChatroom(props.uid, props.interlocutor.id)
                .then(() => {
                    if (msg.trimEnd().length !== 0) {
                        props.SEND_MESSAGE(msg.trimEnd(), 'text', props.uid)
                        props.sendMessage({
                            date: new Date().toISOString(),
                            message: msg.trimEnd(),
                            sender: props.uid,
                            msgType: 'text'
                        }, props.interlocutor.id)
                        setMsg('')
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
        else {
            if (msg.trimEnd().length !== 0) {
                props.SEND_MESSAGE(msg.trimEnd(), 'text', props.uid)
                props.sendMessage({
                    date: new Date().toISOString(),
                    message: msg.trimEnd(),
                    sender: props.uid,
                    msgType: 'text',
                }, props.interlocutor.id)
                setMsg('')
            }
        }
    }

    const handleCamera = () => {
        ImagePicker.openCamera({
            compressImageQuality : 0.5,
            mediaType : 'photo'
        }).then( async image => {
                const reference = firebaseStorage().ref('chat').child(`${props.uid}-${image.path}-${new Date().getTime()}`)
                await reference.putFile(image.path)
                await reference.getDownloadURL().then(url => {
                    props.SEND_MESSAGE(url, 'image', props.uid)
                    props.sendMessage({
                        date: new Date().toISOString(),
                        message: url,
                        sender: props.uid,
                        msgType: 'image'
                    }, props.interlocutor.id)
                })
        }).catch( err => {
            console.log(err);
        } )
    }

    const handleSendPhoto = () => {
        if (props.messages.length === 0) {
            props.createChatroom(props.uid, props.interlocutor.id)
                .then(() => {
                    ImagePicker.openPicker({
                        multiple: false,
                        compressImageQuality : 0.6,
                        mediaType : 'photo'
                    }).then( images => {
                        images.map(async image => {
                            const reference = firebaseStorage().ref('chat').child(`${props.uid}-${image.path}-${new Date().getTime()}`)
                            await reference.putFile(image.path)
                            await reference.getDownloadURL().then(url => {
                                props.SEND_MESSAGE(url, 'image', props.uid)
                                props.sendMessage({
                                    date: new Date().toISOString(),
                                    message: url,
                                    sender: props.uid,
                                    msgType: 'image'
                                }, props.interlocutor.id)
                            })
                        })
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            ImagePicker.openPicker({
                multiple: true,
                compressImageQuality : 0.6,
                maxFiles: 10,
                mediaType : 'photo'
            }).then(images => {
                images.map(async image => {
                    const reference = firebaseStorage().ref('chat').child(`${props.uid}-${image.path}-${new Date().getTime()}`)
                    await reference.putFile(image.path)
                    await reference.getDownloadURL().then(url => {
                        props.SEND_MESSAGE(url, 'image', props.uid)
                        props.sendMessage({
                            date: new Date().toISOString(),
                            message: url,
                            sender: props.uid,
                            msgType: 'image'
                        }, props.interlocutor.id)
                    })
                })
            })
        }
    }

    React.useEffect(() => {
        if (msg.trimEnd().length !== 0) {
            animate()
        } else {
            animateOut()
        }
    })

    return (
        <>
            <View style={message.chatInputContainer}>
                <TouchableOpacity
                    onPress={() => {
                        handleCamera()
                    }}
                >
                    <LinearGradient
                        style={[{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: widthToDp('4'),
                            backgroundColor: color.BLUE_4,
                            height: widthToDp('8'),
                            width: widthToDp('8'),
                            borderRadius: widthToDp('4')
                        }]}
                        colors={[
                            color.IOS_INDIGO_LIGHT,
                            color.BLUE_0
                        ]}
                    >
                        <Feather name='camera' style={{ fontSize: widthToDp('5'), color: color.BLUE_5 }} />
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        handleSendPhoto()
                    }}
                >
                    <LinearGradient
                        style={[{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: widthToDp('2'),
                            backgroundColor: color.BLUE_4,
                            height: widthToDp('8'),
                            width: widthToDp('8'),
                            borderRadius: widthToDp('4')
                        }]}
                        colors={[
                            color.IOS_BLUE,
                            color.BLUE_0
                        ]}
                    >
                        <Feather name='image' style={{ fontSize: widthToDp('5'), color: color.BLUE_5 }} />
                    </LinearGradient>
                </TouchableOpacity>
                <View
                    style={{
                        flex: 1,
                        paddingRight: widthToDp('4'),
                        paddingVertical: widthToDp('1'),
                        backgroundColor: color.BLUE_5,
                        marginHorizontal: widthToDp('2'),
                        marginRight : widthToDp('4'),
                        borderRadius: widthToDp('4'),
                        flexDirection: 'row',
                        alignItems: 'flex-start'
                    }}
                >
                    <TextInput
                        value={msg}
                        onChangeText={(val) => {
                            setMsg(val)
                        }}
                        autoFocus
                        multiline
                        autoCorrect={false}
                        style={{
                            flex: 1,
                            paddingVertical : 0,
                            paddingHorizontal: widthToDp('4'),
                            lineHeight: widthToDp('4'),
                            fontSize: widthToDp('4'),
                        }}
                        placeholder='Aa'

                    />
                    <Animated.View
                        style={[{
                            opacity,
                            transform: [
                                { scaleX: translateX },
                                { scaleY: translateY }
                            ]
                        }]}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                handleSendMessage()
                            }}
                        >
                            {/* <Text style={{ fontSize: widthToDp('4.5'), fontWeight: 'bold', color: color.GREEN_3 }}>
                                Send
                                    </Text> */}
                            <Ionicons name='paper-plane' style={{ fontSize: widthToDp('5'), color: color.BLUE_2 }} />
                        </TouchableOpacity>
                    </Animated.View>

                </View>
            </View>
        </>
    )
}

export default connect(mapStateToProps, { createChatroom, SEND_MESSAGE, sendMessage })(ChatInput)