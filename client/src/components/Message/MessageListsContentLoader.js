import React from 'react'

import { View, Text, Image, TouchableOpacity } from 'react-native'

import { message, widthToDp } from '../../stylesheet'

import ContentLoader from 'react-native-easy-content-loader'

const MessageListContentLoader = () => {


    const _month = ['มค','กพ','มีค','เมย','พค','มิย','กค','สค','กย','ตค','พย','ธค']

    return (
        <>
            <View style={message.listContainer}>
                <ContentLoader 
                    avatar
                    avatarStyles={message.image}
                    title
                    pRows={1}
                />
            </View>
            {/* <TouchableOpacity style={message.listContainer} onPress={() => onPress()}>
                <View style={message.imageContainer}>
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
                        <ContentLoader 
                            pRows={0}
                        />
                    </View>
                </View>
            </TouchableOpacity> */}
        </>
    )
}

export default MessageListContentLoader