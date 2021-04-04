import React, { useEffect } from 'react'

import { Text, View, TouchableOpacity, Image, Button, StyleSheet } from 'react-native'

import { acceptedOrder, color, widthToDp, notification } from '../../stylesheet'

import Feather from 'react-native-vector-icons/Feather'

import { removeOrder } from '../../store/actions/notiAction'
import { acceptedReq } from '../../store/actions/socketAction'
import { OPEN_PRICE_INPUT_MODAL } from '../../store/actions/modalAction'

import PriceInputModal from '../Modal/PriceInputModal'

import { connect } from 'react-redux'
import { TextInput } from 'react-native-gesture-handler'

const mapStateToProps = (state) => ({
    uid: state.auth.userInfo.uid,
    firstname: state.auth.userInfo.firstname,
    lastname: state.auth.userInfo.lastname
})

const mapDispatchToProps = {
    removeOrder,
    acceptedReq,
    OPEN_PRICE_INPUT_MODAL
}

const AcceptedAbstract = (props) => {
    return (
        <>
            <View style={!props.last ? [notification.abstractContainer, notification.abstractBottomBorder] : notification.abstractContainer}>
                <View style={notification.imageContainer}>
                    <TouchableOpacity style={notification.image}>
                        <Image
                            style={notification.image}
                            source={{uri : props.order.userInfoID.avatar}}
                            resizeMode='cover'
                            resizeMethod='resize'
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity 
                    style={notification.detailContainer}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <View style={{ flexWrap: 'nowrap' }}>
                            <Text style={[acceptedOrder.text, notification.nameText]}>
                                {`${props.order.userInfoID.firstname} ${props.order.userInfoID.lastname}`}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[acceptedOrder.text, notification.detailText]}> ดูรายละเอียด</Text>
                            <Feather name='chevron-right' style={[acceptedOrder.text, notification.detailText]} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
                            <Text style={[acceptedOrder.text, notification.detailText]}>
                                {`ห่างจากคุณ : ${props.distance} กม. `}
                            </Text>
                            <Text style={[acceptedOrder.text, notification.detailText]}>
                                {`วันที่: ${props.date}`}
                            </Text>
                            <Text style={[acceptedOrder.text, notification.detailText]}>
                                {`รายละเอียด: ${props.order.detail}`}
                            </Text>
                        </View>
                        <View style={notification.buttonContainer}>
                            <TouchableOpacity
                                style={[acceptedOrder.acceptButton, notification.button]}
                                onPress={() => {
                                    console.log(props.order);
                                }}
                            >
                                <Text style={acceptedOrder.buttonText}>
                                    สอบถาม
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(AcceptedAbstract)