import React, { useEffect } from 'react'

import { Text, View, TouchableOpacity, Image, PixelRatio } from 'react-native'

import { userNotification, color, notification } from '../../stylesheet'

import Feather from 'react-native-vector-icons/Feather'

import { Rating } from 'react-native-ratings';

import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { connect } from 'react-redux';

import { SET_INTERLOCUTOR_ID, ENTER_PRIVATE_CHAT } from '../../store/actions/chatAction'
import { LOADED , LOADING } from '../../store/actions/authAction'
import { GET_TECHNICIAN_INFO } from '../../store/actions/techAction'
import { confirmTechnician, socket } from '../../store/actions/socketAction'


const mapStateToProps = (state) => ({
    uid: state.auth.userInfo.uid,
    
})

const mapDispatchToProps = {
    SET_INTERLOCUTOR_ID, 
    ENTER_PRIVATE_CHAT, 
    LOADED,
    LOADING,
    GET_TECHNICIAN_INFO,
    confirmTechnician
}

const Abstract = ({ name, star, distance, price, last, avatar, techID ,...props }) => {

    const navigation = useNavigation()
    const handleContact = () => {
        props.ENTER_PRIVATE_CHAT( props.uid , techID)
            .then(() => {
                props.LOADED()
                navigation.navigate('chat')
            })
    }

    const handleGetTechInfo = () => {
        props.GET_TECHNICIAN_INFO(techID)
        .then( () => {
            navigation.navigate('techInfo')
        })
    }

    const handleAccept = () => {
        props.confirmTechnician(props.formID , techID)
        navigation.navigate('accepted')
    }


    return (
        <>
            <View style={!last ? [notification.abstractContainer, notification.abstractBottomBorder] : [notification.abstractContainer]}>
                <View style={notification.imageContainer}>
                    <TouchableOpacity 
                        onPress={ () => {
                            handleGetTechInfo()
                        }}
                    style={notification.image}>
                        <Image
                            style={notification.image}
                            source={{ uri: avatar }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={notification.detailContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'column' }}>
                        <View style={{ flex: 1, flexWrap: 'nowrap', flexShrink: 0 }}>
                            <Text style={[userNotification.text, notification.nameText]}>
                                {`${name}`}
                            </Text>
                        </View>
                            <View style={{ justifyContent: 'center' }}>
                                <View style={{ alignItems: 'flex-start' }}>
                                    <Rating type='custom' imageSize={12} readonly startingValue={star} ratingColor={color.YELLOW} ratingBackgroundColor={color.BLUE_4} tintColor={color.BLUE_5} />
                                </View>
                            </View>
                            <Text style={[userNotification.text, notification.detailText]}>
                                {`ห่างจากคุณ : ${distance} กม. `}
                            </Text>
                            <Text style={[userNotification.text, notification.detailText]}>
                                {`ราคา: ${price} บาท`}
                            </Text>

                        </View>
                        <View style={notification.buttonContainer}>
                            <TouchableOpacity 
                                style={[userNotification.acceptButton, notification.button]}
                                onPress={ () => {
                                    handleAccept()
                                }}    
                            >
                                <Text style={userNotification.buttonText}>
                                    ตอบรับ
                        </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    handleContact()
                                }}
                                style={[userNotification.contactButton, notification.button]}
                            >
                                <Text style={userNotification.buttonText}>
                                    สอบถาม
                        </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Abstract)