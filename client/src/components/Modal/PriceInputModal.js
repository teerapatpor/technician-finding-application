import React from 'react'

import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'

import Modal from 'react-native-modalbox'

import { CLOSE_PRICE_INPUT_MODAL } from '../../store/actions/modalAction'
import { acceptedReq } from '../../store/actions/socketAction'

import { connect } from 'react-redux'
import { color } from '../../stylesheet/colors'
import { widthToDp } from '../../stylesheet'
import { techRegModalStyles } from './SelectAptitudeModal'
import { TextInput } from 'react-native-gesture-handler'

const mapStateToProps = (state) => ({
    isOpen: state.modal.price_input_modal,
    order_id: state.modal.order_id,
    uid: state.auth.userInfo.uid,
})

const mapDispatchToProps = {
    CLOSE_PRICE_INPUT_MODAL,
    acceptedReq
}

const PriceInputModal = (props) => {

    const [minPrice, setMinPrice] = React.useState(0)
    const [maxPrice, setMaxPrice] = React.useState(0)

    const handleAccept = () => {
        if (maxPrice === minPrice) {
            alert('กรุณาใส่จำนวนเงินให้ถูกต้อง')
        }
        else {
            props.acceptedReq({
                _id: props.order_id,
                minPrice: minPrice,
                maxPrice: maxPrice,
                uid: props.uid
            })
            onClose()
        }
    }

    const onClose = () => {
        props.CLOSE_PRICE_INPUT_MODAL()
        setMinPrice('')
        setMaxPrice('')
    }

    return (
        <>
            <Modal
                isOpen={props.isOpen}
                onClosed={() => onClose()}
                backButtonClose={true}
                style={{ backgroundColor: 'transparent' , zIndex : 3 }}
                position='center'
                swipeToClose={false}
            >

                <SafeAreaView
                    style={techRegModalStyles.container}
                >
                    <View
                        style={{
                            backgroundColor: '#fff',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            width: widthToDp('80'),
                            borderRadius: widthToDp('4'),
                        }}>
                        <View style={techRegModalStyles.header}>
                            <Text
                                style={techRegModalStyles.headerText}
                            >
                                ระบุราคาโดยประมาณ
                            </Text>
                        </View>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingVertical: widthToDp('2'),
                                width: '100%'
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    padding: widthToDp('4')
                                }}
                            >
                                <TextInput
                                    placeholderTextColor={color.GREY}
                                    keyboardType='number-pad'
                                    placeholder='ต่ำสุด'
                                    autoFocus
                                    style={{
                                        flex: 1,
                                        textAlign: 'center',
                                        backgroundColor: color.GREY_5,
                                        padding: widthToDp('2'),
                                        borderRadius: widthToDp('3'),
                                        marginRight: widthToDp('1'),
                                        fontSize: widthToDp('4'),
                                        color: color.BLUE_0
                                    }}
                                    onChangeText={(val) => {
                                        setMinPrice(parseInt(val))
                                    }}
                                />
                                <TextInput
                                    style={{
                                        flex: 1,
                                        textAlign: 'center',
                                        backgroundColor: color.GREY_5,
                                        padding: widthToDp('2'),
                                        borderRadius: widthToDp('3'),
                                        marginLeft: widthToDp('1'),
                                        fontSize: widthToDp('4'),
                                        color: color.BLUE_0

                                    }}
                                    onChangeText={(val) => {
                                        setMaxPrice(parseInt(val))
                                    }}
                                    keyboardType='number-pad'
                                    placeholderTextColor={color.GREY}
                                    placeholder='สูงสุด'
                                />
                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                height: widthToDp('12'),
                                borderBottomRightRadius: widthToDp('4'),
                                borderBottomLeftRadius: widthToDp('4'),
                                borderTopColor: color.GREY_5,
                                borderTopWidth: 1
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    borderRightColor: color.GREY_5,
                                    borderRightWidth: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                onPress={() => {
                                    onClose()
                                }}
                            >
                                <Text
                                    style={{
                                        color: color.IOS_RED_LIGHT,
                                        fontWeight: 'bold',
                                        fontSize: widthToDp('4')
                                    }}
                                >
                                    ยกเลิก
                            </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                onPress={() => {
                                    // onClose()
                                    handleAccept()
                                }}
                            >
                                <Text
                                    style={{
                                        color: color.IOS_GREEN_LIGHT,
                                        fontWeight: 'bold',
                                        fontSize: widthToDp('4')
                                    }}
                                >
                                    ยืนยัน
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </Modal>
        </>
    )
}


export default connect(mapStateToProps, mapDispatchToProps)(PriceInputModal)