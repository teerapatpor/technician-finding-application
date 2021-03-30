import React from 'react'

import { View, Text, Image, TouchableOpacity } from 'react-native'

import { message, widthToDp } from '../../stylesheet'
import { TextInput } from 'react-native-gesture-handler'


const MessageList = ({ status, name, firstname, lastMessage, badges, date, onPress, avatar, msgType }) => {


    const _month = ['มค', 'กพ', 'มีค', 'เมย', 'พค', 'มิย', 'กค', 'สค', 'กย', 'ตค', 'พย', 'ธค']

    return (
        <>
            <TouchableOpacity style={message.listContainer} onPress={() => onPress()}>
                <View style={message.imageContainer}>
                    {/* image */}
                    <Image style={message.image} source={{ uri: avatar }} />
                    {
                        badges !== 0 ? (
                            <View style={message.badges}>
                                <Text style={message.badgesText}>
                                    {badges}
                                </Text>
                            </View>
                        )
                            :
                            null
                    }
                </View>
                <View style={message.listContent}>
                    <Text style={[message.name, !status ? message.unreadName : null]}>
                        {name}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}
                    >
                        <View
                            style={{ flex: 1 , marginRight : widthToDp('2')}}
                        >
                            <Text
                                style={[message.text, !status ? message.unreadMessage : null,
                                {
                                    height: widthToDp('5'),
                                    lineHeight: widthToDp('5')
                                }
                                ]}>
                                {
                                    msgType === 'image' ? `${firstname} : ได้ส่งรูปภาพ` :
                                        msgType === "text" ? `${firstname} : ${lastMessage}`
                                            : null
                                }
                            </Text>
                        </View>
                        <View>
                            <Text
                                style={[message.dateTimeText, !status ? message.unreadMessage : null,
                                {
                                    height: widthToDp('5'),
                                    lineHeight: widthToDp('5')
                                }
                                ]}>
                                {
                                    new Date(date).getDate() !== new Date().getDate()
                                        && new Date(date).getDate() !== new Date().getMonth()
                                        && new Date(date).getFullYear !== new Date().getFullYear()
                                        ? `${new Date(date).getDate()} ${_month[new Date(date).getMonth()]} ${new Date(date).getFullYear() + 543}`
                                        : `${('0'+(new Date(date).getHours())).slice(-2)} : ${('0' + new Date(date).getMinutes()).slice(-2)} น.`
                                }
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    )
}

export default MessageList