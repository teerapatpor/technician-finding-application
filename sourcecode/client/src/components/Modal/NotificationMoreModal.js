import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import Modal from 'react-native-modalbox'
import { heightToDp, widthToDp } from '../../stylesheet'
import { color } from '../../stylesheet/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'

const NotificationMoreModal = ({ isOpen, onClosed }) => {


    return (
        <>
            <Modal
                isOpen={isOpen}
                onClosed={() => onClosed()}
                backButtonClose={true}
                position='bottom'
                swipeArea={heightToDp('3')}
                style={{
                    height: heightToDp('12'),
                    borderTopRightRadius: heightToDp('3'),
                    borderTopLeftRadius: heightToDp('3'),
                    backgroundColor: color.BLUE_2
                }}
            >
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            height: heightToDp('3'),
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: color.GREY_2,
                                height: 5,
                                width: widthToDp('10'),
                                borderRadius: 5
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            width : '100%'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: '60%',
                                backgroundColor: color.GREY_5,
                                justifyContent: "center",
                                alignItems: 'center',
                                paddingVertical: widthToDp('2'),
                                borderRadius: widthToDp('2.5'),
                                alignSelf: 'center'
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: widthToDp('4'),
                                    fontWeight: 'bold',
                                    color: color.IOS_RED_DARK
                                }}
                            >
                                ลบ
                            </Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </Modal>
        </>
    )
}

export default NotificationMoreModal