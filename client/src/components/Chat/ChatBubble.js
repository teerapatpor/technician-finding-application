import React, { } from 'react'

import { View, Text, Image } from 'react-native'
import { message, widthToDp } from '../../stylesheet'
import { TouchableOpacity } from 'react-native-gesture-handler'

const DateShow = ({ date, current_date }) => {
    const _month = ['มค','กพ','มีค','เมย','พค','มิย','กค','สค','กย','ตค','พย','ธค']

    return (
        <View style={message.newDateContainer}>
            <Text style={message.newDateText}>
                {
                    date.toDateString() === current_date.toDateString() ? (
                        date.toTimeString().slice(0, 8)
                    ) : (
                            `${date.getDate()} ${_month[date.getMonth()]} ${date.getFullYear() + 543}`
                        )
                }
            </Text>
        </View>
    )
}

const ChatBubble = ({ sender, text, name, time, isLast, isFirst, isNewDate, type , setImageIsOpen , setImageUrl}) => {
    const current_date = new Date()
    const _month = ['มค','กพ','มีค','เมย','พค','มิย','กค','สค','กย','ตค','พย','ธค']
    return (
        <>
            {
                isNewDate ? <DateShow date={time} current_date={current_date} /> : null
            }

            <View style={[message.bubbleContainer, sender ? message.rightContainer : message.leftContainer]}>
                {
                    isFirst && !sender ?
                        (
                            <View style={[message.nameContainer, sender ? message.rightNameContainer : message.leftNameContainer]}>
                                <Text style={[message.nameText, sender ? message.rightNameText : message.leftNameText]}>{name}</Text>
                            </View>
                        ) : null
                }

                {
                    type === 'text' ? (
                        <View 
                            style={[
                                message.bubble, 
                                sender ? message.rightBubble : message.leftBubble,
                                !isNewDate && !isLast && sender ? { borderTopRightRadius : widthToDp('2') , borderBottomRightRadius : widthToDp('2')  } : null,
                                !isNewDate && !isLast && !sender ? { borderTopLeftRadius : widthToDp('2') , borderBottomLeftRadius : widthToDp('2')  } : null,
                                isNewDate && !isLast && sender ? { borderBottomRightRadius : widthToDp('2')  } : null,
                                isNewDate && !isLast && !sender ? { borderBottomLeftRadius : widthToDp('2')  } : null,
                                !isNewDate && isLast && sender ? { borderTopRightRadius : widthToDp('2')  } : null,
                                !isNewDate && isLast && !sender ? { borderTopLeftRadius : widthToDp('2')  } : null,
                            ]}
                            >
                            <Text style={[message.text, sender ? message.rightText : message.leftText]}>
                                {text}
                            </Text>
                        </View>
                    ) :
                        type === 'image' ? (
                            <TouchableOpacity
                                onPress={ () => {
                                    setImageIsOpen(true)
                                    setImageUrl(text)
                                }}
                            >
                                <Image
                                    style={[message.bubleImage , sender ? message.rightImageBubble : message.leftImageBubble]}
                                    source={{ uri: text }}
                                    resizeMethod='resize'
                                    resizeMode='cover'
                                />
                            </TouchableOpacity>
                        ) : null
                }

                <View 
                    style={[
                        message.dateTimeContainer,
                        sender ? {marginRight : widthToDp('1')} : {marginLeft : widthToDp('1')}
                        
                    ]}
                >
                    {
                        isLast ? (
                            <Text style={[message.dateTimeText , {marginTop : 5}]}>
                                {
                                    current_date.toDateString() === time.toDateString() ?
                                        (
                                            `${time.toTimeString().slice(0, 8)} น.`
                                        ) :
                                        `${time.getDate()} ${_month[time.getMonth()]} ${time.getFullYear() + 543}`
                                }
                            </Text>
                        ) : null
                    }

                </View>
            </View>
        </>
    )
}

export default ChatBubble