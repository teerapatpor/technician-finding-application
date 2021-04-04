import React from 'react'
import { View, Button, Text, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modalbox'
import { widthToDp, color } from '../../stylesheet'

const LogoutConfirmModal = ( { isOpen , ...props}) => {
    return (
        <>
            <Modal
                isOpen={isOpen}
                backButtonClose={true}
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'transparent'
                }}
                onClosed={ () => props.onClose()}
                swipeToClose ={false}
            >
                <View
                    style={{
                        width: widthToDp('70'),
                        height: widthToDp('35'),
                        backgroundColor: '#fff',
                        borderRadius: widthToDp('4'),
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{
                                color: '#000',
                                fontWeight: 'bold',
                                fontSize: widthToDp('4')
                            }}
                        >
                            ออกจากระบบจาก
                        </Text>
                        <Text
                            style={{
                                color: '#000',
                                fontWeight: 'bold',
                                fontSize: widthToDp('4')
                            }}
                        >
                            {props.name}
                        </Text>
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
                            onPress={ () => {
                                props.onLogout()
                                props.onClose()
                            }}
                        >
                            <Text
                                style={{
                                    color: color.IOS_RED_LIGHT,
                                    fontWeight: 'bold',
                                    fontSize: widthToDp('4')
                                }}
                            >
                                ออกจากระบบ
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            onPress={() => {
                                props.onClose()
                            }}
                        >
                            <Text
                                style={{
                                    color: '#000',
                                    fontWeight: 'bold',
                                    fontSize: widthToDp('4')
                                }}
                            >
                                ยกเลิก
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default LogoutConfirmModal