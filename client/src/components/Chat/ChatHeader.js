import React, { } from 'react'

import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
} from 'react-native';


import { global } from '../../stylesheet'

import Feather from 'react-native-vector-icons/Feather'
import { connect } from 'react-redux';
import { GET_TECHNICIAN_INFO } from '../../store/actions/techAction'

const mapStateToProps = (state) => ({
    interlocutor: state.chat.interlocutor
})

const ChatHeader = (props) => {
    const badgesNum = 1
    return (
        <>
            <View style={[global.chatHeader]}>
                <TouchableOpacity
                    onPress={() => {
                        props.GET_TECHNICIAN_INFO(props.interlocutor.id)
                            .then(() => {
                                props.navigation.navigate('techInfo')
                            })
                    }}
                >
                    <Image style={global.interlocutorImage} source={{ uri: props.interlocutor.avatar }} />
                </TouchableOpacity>
                <TouchableOpacity style={global.nameContainer}
                    onPress={() => {
                        props.GET_TECHNICIAN_INFO(props.interlocutor.id)
                            .then(() => {
                                props.navigation.navigate('techInfo')
                            })
                    }}
                >
                    <Text style={global.interlocutorName}>
                        {props.interlocutor.name}
                    </Text>
                    <Feather name="chevron-right" style={global.rightIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={global.backIconContainer}
                    onPress={() => {
                        props.navigation.goBack()
                    }}
                >
                    <Feather name="chevron-left" style={global.backIcon} />
                </TouchableOpacity>
            </View>
        </>
    )
}

export default connect(mapStateToProps, { GET_TECHNICIAN_INFO })(ChatHeader)