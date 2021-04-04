import React, { useEffect } from 'react'

import { Text, View, TouchableOpacity, Image, Button, StyleSheet, Animated, Easing } from 'react-native'

import { newOrder, color, widthToDp, notification } from '../../stylesheet'

import Feather from 'react-native-vector-icons/Feather'

import { removeOrder } from '../../store/actions/notiAction'
import { acceptedReq } from '../../store/actions/socketAction'
import { OPEN_PRICE_INPUT_MODAL, OPEN_DETAIL_MODAL, getFormInfo, setFormInfo } from '../../store/actions/modalAction'

import { connect } from 'react-redux'
import Geolocation from '@react-native-community/geolocation'

const mapStateToProps = (state) => ({
    uid: state.auth.userInfo.uid,
    firstname: state.auth.userInfo.firstname,
    lastname: state.auth.userInfo.lastname,
})

const mapDispatchToProps = {
    removeOrder,
    acceptedReq,
    OPEN_DETAIL_MODAL,
    OPEN_PRICE_INPUT_MODAL,
    getFormInfo,
    setFormInfo
}

const Abstract = (props) => {

    const handleRemoveOrder = () => {
        props.removeOrder(props.order._id , props.uid)
        props.handleNewOrder()
    }

    const [opacity, setOpacity] = React.useState(new Animated.Value(0))

    const scaleX = opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    })

    const animateIn = () => {
        Animated.spring(
            opacity, {
            toValue: 1,
            delay: 0,
            easing: Easing.elastic(2),
            useNativeDriver: true
        }
        ).start()
    }

    const animateOut = () => {
        Animated.timing(
            opacity, {
            toValue: 0,
            duration: 500,
            easing: Easing.elastic(2),
            useNativeDriver: true
        }
        ).start()
    }

    const [acceptScaleY, setAceptScaleY] = React.useState(new Animated.Value(1))

    const animateAccepted = () => {
        Animated.spring(
            acceptScaleY, {
            toValue: 0,
            delay: 1,
        }
        )
    }

    return (
        <>
            <>
                <TouchableOpacity
                    style={[notification.abstractContainer , newOrder.bg]}
                    onPress={() => {
                        props.getFormInfo(props.order._id)
                            .then(form => {
                                props.OPEN_DETAIL_MODAL(props.order._id)
                            }).catch(err => {
                                console.log(err);
                            })
                    }}
                >
                    <View style={notification.imageContainer}>
                        <TouchableOpacity style={notification.image}>
                            <Image
                                style={notification.image}
                                source={{ uri: props.order.userInfoID.avatar }}
                                resizeMethod='resize'
                                resizeMode='cover'
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={notification.detailContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ flexWrap: 'nowrap' }}>
                                <Text style={[newOrder.text, notification.nameText]}>
                                    {`${props.order.userInfoID.firstname} ${props.order.userInfoID.lastname}`}
                                </Text>
                            </View>
                            {/* <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[newOrder.text, notification.detailText]}> ดูรายละเอียด</Text>
                                <Feather name='chevron-right' style={[newOrder.text, notification.detailText]} />
                            </View> */}
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flex : 1, flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                <Text style={[newOrder.text, notification.detailText]}>
                                    {`ห่างจากคุณ : ${props.order.distance} กม. `}
                                </Text>
                                <Text style={[newOrder.text, notification.detailText]}>
                                    {`วันที่: ${props.date}`}
                                </Text>
                                <Text style={[newOrder.text, notification.detailText]}>
                                    {`รายละเอียด:`}
                                </Text>
                                <Text style={[newOrder.text, notification.detailText]}>
                                    {`${props.order.detail}`}
                                </Text>
                            </View>
                            <View style={notification.buttonContainer}>
                                <TouchableOpacity
                                    style={[newOrder.acceptButton, notification.button]}
                                    onPress={() => {
                                        // animateIn()
                                        props.OPEN_PRICE_INPUT_MODAL(props.order._id)
                                    }}
                                >
                                    <Text style={newOrder.buttonText}>
                                        ตอบรับ
                                            </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[newOrder.contactButton, notification.button]}
                                    onPress={() => {
                                        handleRemoveOrder()
                                        
                                    }}
                                >
                                    <Text style={newOrder.buttonText}>
                                        ไม่สนใจ
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </>
        </>
    )
}

const priceInput = StyleSheet.create({
    textInput: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: color.GREY_5,
        fontSize: widthToDp('4'),
        marginHorizontal: widthToDp('2'),
        height: widthToDp('7'),
        borderRadius: widthToDp('2')
    },
    btn: {
        marginTop: widthToDp('2'),
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: widthToDp('7'),
        borderRadius: widthToDp('1'),
    },
    cancel: {
        // backgroundColor: color.RED_3
    },
    accept: {
        // backgroundColor: color.GREEN_4
    },
    acceptText: {
        color: color.IOS_GREEN_LIGHT,
        fontSize: widthToDp('4')
    },
    cancelText: {
        color: color.IOS_RED_LIGHT,
        fontSize: widthToDp('4')
    },
    headerText: {
        color: color.BLUE_2,
        fontSize: widthToDp('4')
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Abstract)